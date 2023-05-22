<template>
  <CalendarWeeklyPopoverItemInput
    :model-value="selectedMonth"
    :head-button-label="displayedYear.toString()"
    :items="months"
    v-bind="$attrs"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'

import { ICalendarWeeklyPopoverItem } from '@/components/CalendarWeekly.types'
import CalendarWeeklyPopoverItemInput from '@/components/CalendarWeeklyPopoverItemInput.vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  displayedYear: { type: Number, required: true },
  selectedYear: { type: Number, required: true }
})

const selectedMonth = ref<ICalendarWeeklyPopoverItem>()
const months = computed<ICalendarWeeklyPopoverItem[]>(() => {
  return dayjs.monthsShort().map((monthName, index) => ({
    value: index,
    label: monthName.slice(0, 3),
    key: `${props.displayedYear}-${index}`
  }))
})

watch(
  () => props.modelValue,
  (modelValue: number) => {
    selectedMonth.value = months.value.find(month => month.value === modelValue)
  },
  { immediate: true }
)
</script>
