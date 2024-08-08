<template>
  <main class="container">
    <div class="flex justify-between">
      <h1 class="text-h1">xx</h1>

      <Button
        link
        outline
        class="group"
        title="xx xx xx xx xx xx Excel"
        :loading="exportLoading"
        @click="exportToExcel"
      >
        <span class="flex space-x-10">
          <ShareSVG class="text-blue group-hover:text-red transition-colors" />
          <span>Excel</span>
        </span>
      </Button>
    </div>

    <Filters
      class="mt-30"
      :default-date-range="defaultDateRange"
      @filters-change="fetchWithFilters"
    />

    <div v-if="statistics" class="flex justify-end items-center mt-25">
      <span class="mr-5 text-description text-gray-500">xx xx xx:</span>
      <span class="text-subtitle text-black">{{ prettifiedTotal }} ₽</span>
    </div>

    <template v-if="transactionsExist">
      <Transactions
        v-if="transactions"
        :transactions="transactions"
        class="mt-25"
        :loading="transactionsLoading"
        @page-change="fetchTransactions"
      />
    </template>

    <p v-else class="mt-60 text-subtitle text-gray">
      xx xx xx xx xx
    </p>
  </main>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import ShareSVG from '~/assets/svg/share.svg'
import Button from '~/components/Button.vue'
import InputSelect from '~/components/InputSelect.vue'
import LegalTransactionsPageFilters from '~/components/LegalTransactionsPageFilters.vue'
import LegalTransactionsPageTable from '~/components/LegalTransactionsPageTable.vue'
import { BonusCard } from '~/logic/modules/bonus-cards'
import {
  Transactions,
  TransactionsIndexResponse,
  TransactionStatistics
} from '~/logic/modules/transactions'
import { IDateRange } from '~/logic/types/dates'
import { downloadFileToDevice } from '~/logic/utils/files'
import { prettify } from '~/logic/utils/numbers'
import { dateFilterModes } from '~/mixins/date-filter-mixin'
import { ShowToastMessageMixin } from '~/mixins/show-toast-message-mixin'

@Component({
  components: {
    Filters: LegalTransactionsPageFilters,
    Transactions: LegalTransactionsPageTable,
    InputSelect,
    Button,
    ShareSVG
  },

  head: {
    title: 'xx'
  },

  layout: 'legal'
})
export default class LegalTransactionsPage extends mixins(
  ShowToastMessageMixin
) {
  async asyncData() {
    const defaultDateRange = dateFilterModes.fixedRanges.currentMonth
    const transactions = await Transactions.getTransactions({
      dateRange: defaultDateRange.range
    })
    const statistics = transactions.meta?.total
      ? await Transactions.getStatistics({
          bonusCardId: undefined,
          dateRange: defaultDateRange.range
        })
      : undefined

    return {
      transactions,
      statistics,
      defaultDateRange
    }
  }

  defaultDateRange: any = null
  statistics: TransactionStatistics | null | undefined = null
  transactions: TransactionsIndexResponse | null | undefined = null

  options = {
    archived: false as boolean,
    bonusCard: undefined as unknown as BonusCard | undefined,
    dateRange: dateFilterModes.fixedRanges.currentMonth
      .range as unknown as IDateRange
  }

  get transactionsExist() {
    return (this.transactions?.meta?.total ?? 0) > 0
  }

  get prettifiedTotal() {
    return prettify(this.statistics?.expenses.total || 0)
  }

  async fetchWithFilters(options: {
    dateRange: IDateRange
    bonusCard: BonusCard | undefined
    archived: boolean
  }) {
    this.options = {
      bonusCard: options.bonusCard,
      dateRange: options.dateRange,
      archived: options.archived
    }
    await Promise.all([this.fetchTransactions(), this.fetchStatistics()])
  }

  transactionsLoading = false
  async fetchTransactions(page: number = 1) {
    this.transactionsLoading = true
    try {
      this.transactions = await Transactions.getTransactions({
        bonusCardId: this.options.bonusCard?.id || undefined,
        dateRange: this.options.dateRange,
        page,
        archived: this.options.archived
      })
    } finally {
      this.transactionsLoading = false
    }
  }

  statisticsLoading = false
  async fetchStatistics() {
    this.statisticsLoading = true
    try {
      this.statistics = await Transactions.getStatistics({
        bonusCardId: this.options.bonusCard?.id || undefined,
        dateRange: this.options.dateRange,
        archived: this.options.archived
      })
    } finally {
      this.statisticsLoading = false
    }
  }

  exportLoading = false
  async exportToExcel() {
    this.exportLoading = true
    try {
      const response = await Transactions.getReport({
        dateRange: this.options.dateRange,
        bonusCardId: this.options.bonusCard?.id || undefined,
        archived: this.options.archived
      })
      if (response.success) {
        downloadFileToDevice(response.data.file, response.data.fileName)
      } else {
        this.showToastMessage('xx xx xx.')
      }
    } finally {
      this.exportLoading = false
    }
  }
}
</script>
