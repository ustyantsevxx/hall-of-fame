<template>
  <div class="grid grid-cols-3 gap-x-30">
    <HistoryPageStatisticsItem
      :item="statistics.expenses"
      title="xx"
      total-label="xx xx"
      total-unit="₽"
    />
    <HistoryPageStatisticsItem
      :item="statistics.liters"
      title="xx"
      total-label="xx xx"
    />
    <HistoryPageStatisticsItem
      v-if="bonusesStatisticsVisible"
      :item="statistics.bonuses"
      title="xx xx"
      total-label="xx xx"
    />
    <HistoryPageStatisticsItem
      v-if="discountStatisticsVisible"
      :item="statistics.discount"
      title="xx xx"
      total-label="xx xx"
      total-unit="₽"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import HistoryPageStatisticsItem from '~/components/HistoryPageStatisticsItem.vue'
import { TransactionStatistics } from '~/logic/modules/transactions'

@Component({
  components: {
    HistoryPageStatisticsItem
  }
})
export default class HistoryPageStatistics extends Vue {
  @Prop({ type: Object, required: true }) statistics!: TransactionStatistics

  get bonusesStatisticsVisible() {
    return !!this.statistics.bonuses.data?.length
  }

  get discountStatisticsVisible() {
    return (
      !this.bonusesStatisticsVisible && !!this.statistics.discount.data?.length
    )
  }
}
</script>
