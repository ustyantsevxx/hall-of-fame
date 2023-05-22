<template>
  <ProviderDateTimeFormat v-slot="{ formatDate }">
    <div class="flex">
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
      </div>

      <div class="ml-16 flex">
        <AppDatepicker
          v-model="selectedDate"
          :placeholder="$t('filter-by-date')"
          input-class="!rounded-r-0 !border-r-0"
          style="width: 143px"
          disable-future-dates
          @input="fetchNewTimeValues"
        />

        <AppSelect
          v-model="selectedTimeOption"
          class="a1-time-value-select"
          :options="timeOptions"
          :no-options-text="
            $t('no-time-values-for-date', { date: formatDate(selectedDate) })
          "
          :placeholder="$t('select-time')"
          style="width: 170px"
          @input="emitNewTimeAndDuration"
        />
      </div>
    </div>
  </ProviderDateTimeFormat>
</template>

<script>
import dayjs from 'dayjs'

import AppDatepicker from '~/components/AppDatepicker.vue'
import AppSelect from '~/components/AppSelect.vue'
import ProviderDateTimeFormat from '~/components/ProviderDateTimeFormat.vue'
import { ContinuousLogsA1Service } from '~/logic/modules/continuous-logs-a1/continuous-logs-a1.service'

export default {
  components: {
    AppDatepicker,
    AppSelect,
    ProviderDateTimeFormat
  },

  props: {
    value: { type: Object, required: true },
    log: { type: Object, required: true },
    allowNullValues: { type: Boolean, default: false },
    addMomentary: { type: Boolean, default: false }
  },

  data() {
    return {
      timeOptions: [],
      durationOptions: [],
      selectedDate: null,
      selectedDurationOption: null,
      selectedTimeOption: null
    }
  },

  async created() {
    const {
      timeOptions,
      durationOptions,
      initialDate,
      initialDurationOption,
      initialTimeOption
    } = await ContinuousLogsA1Service.getChartDataToolbarData(
      this.log,
      this.addMomentary
    )

    this.timeOptions = timeOptions
    this.durationOptions = durationOptions
    this.selectedDate = initialDate
    this.selectedDurationOption = initialDurationOption
    this.selectedTimeOption = initialTimeOption
  },

  methods: {
    getDate() {
      return this.selectedTimeOption
        ? dayjs(this.selectedDate)
            .add(this.selectedTimeOption?.value ?? 0, 'seconds')
            .unix()
        : null
    },

    async fetchNewTimeValues(date) {
      this.selectedTimeOption = null
      this.$emit('input', {
        date: this.getDate(),
        duration: this.selectedDurationOption?.value
      })
      if (!date) {
        this.timeOptions = []
        return
      }

      const instance = dayjs(date)
      const timestampToRequest = instance
        .add(instance.utcOffset(), 'minutes')
        .unix()

      this.timeOptions = await ContinuousLogsA1Service.getTimeOptions(
        timestampToRequest
      )
    },

    emitNewTimeAndDuration() {
      if (
        !this.allowNullValues &&
        (!this.selectedDurationOption || !this.selectedTimeOption)
      ) {
        return
      }

      this.$emit('input', {
        date: this.getDate(),
        duration: this.selectedDurationOption?.value
      })
    }
  }
}
</script>

<style>
.a1-time-value-select .vs__dropdown-toggle {
  @apply !rounded-l-0;
}
</style>
