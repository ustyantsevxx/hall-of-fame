<template>
  <CalendarWeeklyPopoverItemInput
    :model-value="selectedYear"
    :head-button-label="rangeStartEnd"
    :items="years"
    v-bind="$attrs"
    @previous="previousRange"
    @next="nextRange"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'

import { ICalendarWeeklyPopoverItem } from '@/components/CalendarWeekly.types'
import CalendarWeeklyPopoverItemInput from '@/components/CalendarWeeklyPopoverItemInput.vue'

const MIN_YEAR = 0
const MAX_YEAR = Number.POSITIVE_INFINITY
const RANGE_SIZE = 12

const props = defineProps({
  modelValue: { type: Number, required: true }
})

const displayedRangeStartYear = ref<number>(0)
const selectedYear = ref<ICalendarWeeklyPopoverItem>()

const years = computed<ICalendarWeeklyPopoverItem[]>(() => {
  return Array.from({ length: RANGE_SIZE }, (_, index) => {
    const year = displayedRangeStartYear.value + index
    return {
      key: year.toString(),
      label: year.toString(),
      value: year
    }
  })
})

const rangeStartEnd = computed(() => {
  return `${displayedRangeStartYear.value} - ${
    displayedRangeStartYear.value + RANGE_SIZE - 1
  }`
})

watch(
  () => props.modelValue,
  (modelValue: number) => {
    displayedRangeStartYear.value = modelValue - Math.floor(RANGE_SIZE / 2)
    selectedYear.value = years.value.find(year => year.value === modelValue)
  },
  { immediate: true }
)

const previousRange = () => {
  const candidateValue = displayedRangeStartYear.value - RANGE_SIZE
  displayedRangeStartYear.value =
    candidateValue >= MIN_YEAR ? candidateValue : MIN_YEAR
}
const nextRange = () => {
  const candidateValue = displayedRangeStartYear.value + RANGE_SIZE
  displayedRangeStartYear.value =
    candidateValue <= MAX_YEAR ? candidateValue : MAX_YEAR
}
</script>
