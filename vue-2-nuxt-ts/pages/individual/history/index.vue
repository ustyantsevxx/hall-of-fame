<template>
  <main class="container history">
    <PageHeader>
      <template #title>xx xx</template>
      <template #subtitle>
        xx xx xx xx xx xx, xx xx xx xx xx
        xx xx. xx xx xx:
      </template>
    </PageHeader>

    <HistoryPageFilters class="mt-36" @filters-change="fetchWithFilters" />

    <template v-if="transactionsAndStatisticsLoaded">
      <HistoryPageStatistics :statistics="statistics" class="mt-100" />

      <HistoryPageTransactions
        :transactions="transactions"
        class="mt-85"
        @page-change="fetchTransactions"
      />
    </template>

    <p v-else class="mt-60 text-subtitle text-gray">
      xx xx xx xx xx
    </p>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

import HistoryPageFilters from '~/components/HistoryPageFilters.vue'
import HistoryPageStatistics from '~/components/HistoryPageStatistics.vue'
import HistoryPageTransactions from '~/components/HistoryPageTransactions.vue'
import PageHeader from '~/components/PageHeader.vue'
import { BonusCard } from '~/logic/modules/bonus-cards'
import {
  Transactions,
  TransactionsIndexResponse,
  TransactionStatistics
} from '~/logic/modules/transactions'
import { IDateRange } from '~/logic/types/dates'
import { dateFilterModes } from '~/mixins/date-filter-mixin'

@Component({
  components: {
    PageHeader,
    HistoryPageFilters,
    HistoryPageStatistics,
    HistoryPageTransactions
  },

  head: {
    title: 'xx xx'
  }
})
export default class extends Vue {
  async asyncData() {
    const transactions = await Transactions.getTransactions({
      dateRange: dateFilterModes.fixedRanges.currentMonth.range
    })

    const statistics = transactions.meta?.total
      ? await Transactions.getStatistics()
      : undefined

    return {
      statistics,
      transactions
    }
  }

  statistics: TransactionStatistics | null | undefined = null
  transactions: TransactionsIndexResponse | null | undefined = null

  options = {
    bonusCard: undefined as unknown as BonusCard | undefined,
    dateRange: undefined as unknown as IDateRange
  }

  get transactionsAndStatisticsLoaded() {
    return (this.transactions?.meta?.total ?? 0) > 0 && this.statistics
  }

  async fetchWithFilters(options: {
    dateRange: IDateRange
    bonusCard: BonusCard | undefined
  }) {
    this.options = {
      bonusCard: options.bonusCard,
      dateRange: options.dateRange
    }
    await this.fetchTransactions()
    if (this.transactions?.meta?.total) {
      await this.fetchStatistics()
    }
  }

  async fetchTransactions(page: number = 1) {
    this.transactions = await Transactions.getTransactions({
      bonusCardId: this.options.bonusCard?.id || undefined,
      dateRange: this.options.dateRange,
      page
    })
  }

  async fetchStatistics() {
    this.statistics = await Transactions.getStatistics({
      bonusCardId: this.options.bonusCard?.id || undefined,
      dateRange: this.options.dateRange
    })
  }
}
</script>
