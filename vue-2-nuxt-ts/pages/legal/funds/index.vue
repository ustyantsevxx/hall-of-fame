<template>
  <main class="container">
    <h1 class="text-h1">xx xx</h1>

    <div
      class="grid grid-cols-12 pb-75 mt-35 mb-28 border-gray-100"
      :class="{ 'border-b': pageCount > 1 }"
    >
      <div class="col-span-7">
        <div class="pr-38">
          <LegalFundsPageFilters
            :default-date-range="defaultDateRange"
            @filters-change="fetchWithFilters"
          />

          <div class="flex justify-end items-center mt-25">
            <span class="mr-5 text-description text-gray-500">
              xx xx:
            </span>
            <span class="text-subtitle text-black">
              {{ prettifiedTopUpSum }}
            </span>
          </div>
        </div>

        <div class="pr-38">
          <template v-if="fundsExist">
            <LegalFundsPageOperationsTable
              v-if="operationsResponse"
              :operations="operationsResponse.operations"
              :loading="operationsLoading"
              class="mt-35"
              @page-change="fetchOperations"
            />
          </template>
          <p v-else class="mt-60 text-subtitle text-gray">
            xx xx xx xx xx
          </p>
        </div>
      </div>
      <div
        class="flex flex-col col-span-5 space-y-18"
        style="padding-left: 87px"
      >
        <h2 class="pl-30 mb-12 w-full text-h2">xx xx</h2>

        <LegalFundsCompareInfoCard
          v-if="balanceVisible"
          title="xx"
          :first-field="{
            value: prettifiedFunds.now,
            description: 'xx'
          }"
          :second-field="{
            value: !monthStartFundsVisible ? '—' : prettifiedFunds.monthStart,
            description: 'xx xx xx'
          }"
        />

        <LegalFundsInfoCard title="xx" :value="prettifiedTopUp" />

        <LegalFundsInfoCard
          title="xx"
          :value="prettifiedTransactions"
        />

        <LegalFundsInfoCard
          v-if="availableFundsVisible"
          title="xx"
          description="xx xx xx xx"
          :value="prettifiedAvailableFunds"
        />
      </div>
    </div>

    <div v-if="pageCount > 1" class="flex justify-center">
      <Pagination
        v-model="page"
        :page-count="pageCount"
        @input="fetchOperations"
      />
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import ShareSVG from '~/assets/svg/share.svg'
import Button from '~/components/Button.vue'
import InputSelect from '~/components/InputSelect.vue'
import LegalFundsCompareInfoCard from '~/components/LegalFundsCompareInfoCard.vue'
import LegalFundsInfoCard from '~/components/LegalFundsInfoCard.vue'
import LegalFundsPageFilters from '~/components/LegalFundsPageFilters.vue'
import LegalFundsPageOperationsTable from '~/components/LegalFundsPageOperationsTable.vue'
import Pagination from '~/components/Pagination.vue'
import Table from '~/components/Table.vue'
import { BonusCard } from '~/logic/modules/bonus-cards'
import { UserOperationsModule } from '~/logic/modules/user-operations'
import { UserOperationsIndexResponse } from '~/logic/modules/user-operations/user-operations.types'
import { IDateRange } from '~/logic/types/dates'
import { formatRuble } from '~/logic/utils/numbers'
import { dateFilterModes } from '~/mixins/date-filter-mixin'

@Component({
  components: {
    LegalFundsCompareInfoCard,
    Pagination,
    LegalFundsInfoCard,
    LegalFundsPageOperationsTable,
    Table,
    LegalFundsPageFilters,
    InputSelect,
    Button,
    ShareSVG
  },

  head: {
    title: 'xx xx'
  },

  layout: 'legal'
})
export default class LegalFundsPage extends Vue {
  async asyncData() {
    const defaultDateRange = dateFilterModes.fixedRanges.currentMonth
    const operationsResponse = await UserOperationsModule.getOperations({
      isDebit: false,
      dateRange: defaultDateRange.range
    })

    return {
      operationsResponse,
      defaultDateRange
    }
  }

  defaultDateRange: any = null
  page = 1
  operationsResponse: UserOperationsIndexResponse | null | undefined = null

  options = {
    bonusCard: undefined as unknown as BonusCard | undefined,
    dateRange: undefined as unknown as IDateRange
  }

  get monthStartFundsVisible() {
    return this.$accessor.featureFlags.monthStartFundsVisible
  }

  get userInfo() {
    return this.$accessor.auth.user
  }

  get balanceVisible() {
    return this.$accessor?.auth.user.balance_show
  }

  get availableFundsVisible() {
    return this.$accessor?.auth.user.balance_unallocated_show
  }

  get prettifiedFunds() {
    return {
      now: formatRuble(+this.userInfo?.balance),
      monthStart: formatRuble(+this.userInfo?.balance_month_start)
    }
  }

  get prettifiedAvailableFunds() {
    return formatRuble(+this.userInfo?.balance_unallocated)
  }

  get prettifiedTopUp() {
    return formatRuble(+this.userInfo?.monthly?.top_up)
  }

  get prettifiedTransactions() {
    return formatRuble(+this.userInfo?.monthly?.transactions)
  }

  get pageCount() {
    return this.operationsResponse?.operations?.meta?.last_page ?? 0
  }

  get fundsExist() {
    return (this.operationsResponse?.operations?.meta?.total ?? 0) > 0
  }

  get prettifiedTopUpSum() {
    return formatRuble(+(this.operationsResponse?.total || 0))
  }

  async fetchWithFilters(options: {
    dateRange: IDateRange
    bonusCard: BonusCard | undefined
  }) {
    this.options = {
      bonusCard: options.bonusCard,
      dateRange: options.dateRange
    }
    await this.fetchOperations()
  }

  operationsLoading = false
  async fetchOperations(page: number = 1) {
    this.operationsLoading = true
    try {
      this.operationsResponse = await UserOperationsModule.getOperations({
        dateRange: this.options.dateRange,
        isDebit: false,
        page
      })
    } finally {
      this.operationsLoading = false
    }
  }
}
</script>
