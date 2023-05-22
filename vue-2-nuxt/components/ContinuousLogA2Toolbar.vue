<template>
  <div class="flex items-center">
    <p>{{ $t('duration') }}</p>
    <AppSelect
      v-model="selectedDurationOption"
      not-clearable
      class="ml-17"
      :options="durationOptions"
      style="width: 128px"
      dropdown-height="auto"
      @input="emitNewTimeAndDuration"
    />

    <AppDatepicker
      v-model="selectedDate"
      class="ml-16"
      :placeholder="$t('filter-by-date')"
      style="width: 143px"
      disable-future-dates
      @input="emitNewTimeAndDuration"
    />
  </div>
</template>

<script>
import dayjs from 'dayjs'

import AppDatepicker from '~/components/AppDatepicker.vue'
import AppSelect from '~/components/AppSelect.vue'
import { ContinuousLogsA2Service } from '~/logic/modules/continuous-logs-a2/continuous-logs-a2.service'

export default {
  components: {
    AppDatepicker,
    AppSelect
  },

  props: {
    value: { type: Object, required: true },
    log: { type: Object, required: true },
    allowNullValues: { type: Boolean, default: false },
    addMomentary: { type: Boolean, default: false }
  },

  data() {
    return {
      durationOptions: [],
      selectedDate: null,
      selectedDurationOption: null
    }
  },

  created() {
    const {
      durationOptions,
      initialDate,
      initialDurationOption
    } = ContinuousLogsA2Service.getChartDataToolbarData(
      this.log,
      this.addMomentary
    )

    this.durationOptions = durationOptions
    this.selectedDate = initialDate
    this.selectedDurationOption = initialDurationOption
  },

  methods: {
    emitNewTimeAndDuration() {
      if (
        !this.allowNullValues &&
        (!this.selectedDurationOption || !this.selectedDate)
      ) {
        return
      }

      this.$emit('input', {
        date: dayjs(this.selectedDate).unix(),
        duration: this.selectedDurationOption?.value
      })
    }
  }
}
</script>
