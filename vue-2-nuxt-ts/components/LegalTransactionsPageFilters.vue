<template>
  <div class="flex space-x-30">
    <section v-if="bonusCards.length > 1" style="width: 350px">
      <InputSelect
        v-model="bonusCardSelectValue"
        label="Выберите карту"
        :options="bonusCardsOptions"
        @change="handleBonusCardSelectInput"
        @open="fetchBonusCards"
      />
    </section>

    <section style="width: 295px">
      <InputSelect
        v-model.number="dateFilterModeId"
        label="Фильтр по датам"
        title="Диапазон дат"
        :options="dateFilterModeOptions"
        @change="changeDateFilterMode"
      />
    </section>

    <Transition name="fade">
      <section
        v-if="rangeModeSelected"
        class="flex-grow"
        style="max-width: 405px"
      >
        <InputDateRange
          v-model="filters.dateRange"
          label="Укажите диапазон дат"
          placeholder="Выберите диапазон"
          format="DD.MM.YYYY HH:mm"
          edit-time
        />
      </section>
    </Transition>
  </div>
</template>

<script lang="ts">
import { sortBy } from 'lodash'
import { Component, mixins, Prop } from 'nuxt-property-decorator'

import InputDateRange from '~/components/InputDateRange.vue'
import InputSelect from '~/components/InputSelect.vue'
import { BonusCard } from '~/logic/modules/bonus-cards'
import { DateFilterMixin } from '~/mixins/date-filter-mixin'

const ARCHIVED_CARDS_OPTION = Symbol.for('ARCHIVED_CARDS_OPTION')

@Component({
  components: {
    InputSelect,
    InputDateRange
  }
})
export default class LegalTransactionsPageFilters extends mixins(
  DateFilterMixin
) {
  @Prop({ type: Object, required: true }) defaultDateRange!: any

  dateFilterModeId = this.defaultDateRange.id

  bonusCardSelectValue = null
  bonusCardsFetched = false

  filters = {
    dateRange: {
      startDate: this.defaultDateRange.range.startDate as any,
      endDate: this.defaultDateRange.range.endDate as any
    },
    bonusCard: null as any,
    archived: false
  }

  get bonusCards() {
    return this.$accessor.bonusCards
  }

  get bonusCardsOptions() {
    const bonusCardsOptions = sortBy(this.bonusCards, card => card.number).map(
      card => ({
        label: `№${card.number} ${card.owner}`,
        value: card
      })
    )

    return [
      {
        label: 'Все действующие',
        value: null
      },
      {
        label: 'Все архивные',
        value: ARCHIVED_CARDS_OPTION
      },
      ...bonusCardsOptions
    ]
  }

  fetchBonusCards() {
    if (this.bonusCardsFetched) {
      return
    }

    this.$accessor.fetchBonusCards()
    this.bonusCardsFetched = true
  }

  handleBonusCardSelectInput(value: BonusCard | Symbol | null) {
    const archivedSelected = value === ARCHIVED_CARDS_OPTION
    this.filters = {
      ...this.filters,
      archived: archivedSelected,
      bonusCard: !archivedSelected ? value : null
    }
  }
}
</script>
