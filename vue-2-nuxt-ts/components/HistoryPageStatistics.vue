<template>
  <div class="grid grid-cols-3 gap-x-30">
    <HistoryPageStatisticsItem
      :item="statistics.expenses"
      title="Расходы"
      total-label="Общая сумма"
      total-unit="₽"
    />
    <HistoryPageStatisticsItem
      :item="statistics.liters"
      title="Литры"
      total-label="Общее количество"
    />
    <HistoryPageStatisticsItem
      v-if="bonusesStatisticsVisible"
      :item="statistics.bonuses"
      title="Начислено бонусов"
      total-label="Общее количество"
    />
    <HistoryPageStatisticsItem
      v-if="discountStatisticsVisible"
      :item="statistics.discount"
      title="Сумма скидок"
      total-label="Общее количество"
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
