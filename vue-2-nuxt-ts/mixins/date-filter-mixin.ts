import { Component, Vue, Watch } from 'nuxt-property-decorator'

import { xDayjs } from '~/logic/utils/datetime'

export const dateFilterModes = {
  fixedRanges: {
    allTime: {
      id: 1,
      label: 'xx xx xx',
      range: {
        startDate: null,
        endDate: null
      }
    },
    currentMonth: {
      id: 2,
      label: 'xx xx',
      range: {
        startDate: xDayjs().startOf('month'),
        endDate: xDayjs().endOf('month')
      }
    },
    lastMonth: {
      id: 3,
      label: 'xx xx',
      range: {
        startDate: xDayjs().subtract(1, 'month').startOf('month'),
        endDate: xDayjs().subtract(1, 'month').endOf('month')
      }
    }
  },

  special: {
    customRange: {
      id: 4,
      label: 'xx xx'
    }
  }
}

@Component
export class DateFilterMixin extends Vue {
  dateFilterModes = dateFilterModes
  dateFilterModeId = dateFilterModes.fixedRanges.currentMonth.id

  filters = {
    dateRange: {
      startDate: this.filterMode?.range.startDate ?? null,
      endDate: this.filterMode?.range.endDate ?? null
    }
  }

  get dateFilterModeOptions() {
    const allModesFlatten = Object.fromEntries([
      ...Object.entries(dateFilterModes.special),
      ...Object.entries(dateFilterModes.fixedRanges)
    ])

    return Object.values(allModesFlatten)
      .sort((a, b) => a.id - b.id) // save the id order in select
      .map(mode => ({
        label: mode.label,
        value: mode.id
      }))
  }

  get rangeModeSelected() {
    return this.dateFilterModeId === dateFilterModes.special.customRange.id
  }

  get specialModeSelected() {
    return Object.values(dateFilterModes.special).some(
      mode => mode.id === this.dateFilterModeId
    )
  }

  get filterMode() {
    return Object.values(dateFilterModes.fixedRanges).find(
      x => x.id === this.dateFilterModeId
    )
  }

  @Watch('filters', { deep: true })
  onFiltersChanged(value: any) {
    this.$emit('filters-change', value)
  }

  changeDateFilterMode() {
    if (this.specialModeSelected) {
      return
    }

    if (this.filterMode?.range) {
      this.filters.dateRange = this.filterMode.range
    }
  }
}
