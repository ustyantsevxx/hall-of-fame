<template>
  <div class="grid grid-cols-3 gap-x-30">
    <section v-if="bonusCards.length > 1">
      <InputSelect
        v-model="filters.bonusCard"
        label="Выберите карту"
        :options="bonusCardsOptions"
      />
    </section>

    <section>
      <InputSelect
        v-model.number="dateFilterModeId"
        label="Фильтр по датам"
        title="Диапазон дат"
        :options="dateFilterModeOptions"
        @change="changeDateFilterMode"
      />
    </section>

    <Transition name="fade">
      <section v-if="rangeModeSelected">
        <InputDateRange
          v-model="filters.dateRange"
          label="Укажите диапазон дат"
          placeholder="Выберите диапазон"
        />
      </section>
    </Transition>
  </div>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'

import InputDateRange from '~/components/InputDateRange.vue'
import InputSelect from '~/components/InputSelect.vue'
import { DateFilterMixin } from '~/mixins/date-filter-mixin'

@Component({
  components: {
    InputSelect,
    InputDateRange
  }
})
export default class HistoryPageFilters extends mixins(DateFilterMixin) {
  filters = {
    dateRange: {
      startDate: this.filterMode?.range.startDate ?? null,
      endDate: this.filterMode?.range.endDate ?? null
    },
    bonusCard: null
  }

  get bonusCards() {
    return this.$accessor.bonusCards
  }

  get bonusCardsOptions() {
    const bonusCardsOptions = this.bonusCards.map(card => ({
      label: `${card.type?.name_translate} №${card.number}`,
      value: card
    }))

    return [
      {
        label: 'Показать по всем картам',
        value: null
      },
      ...bonusCardsOptions
    ]
  }
}
</script>
