<template>
  <div class="-mx-5 flex justify-between lg:-mx-15 lg:space-x-5">
    <CalendarWeeklyDay
      v-for="(weekDay, weekDayIndex) in days"
      :key="weekDayIndex"
      :day="weekDay.raw"
      :selected="weekDay.key === selectedDateKey"
      :active="weekDay.key === currentDateKey"
      :first="weekDayIndex === 0"
      :last="weekDayIndex === days.length - 1"
      @click="handleSelectDay(weekDay)"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, PropType } from 'vue'

import { CalendarWeeklyDaysDayType } from '@/components/CalendarWeekly.types'
import CalendarWeeklyDay from '@/components/CalendarWeeklyDay.vue'

const props = defineProps({
  modelValue: { type: Date, default: null },
  days: { type: Array as PropType<CalendarWeeklyDaysDayType[]>, required: true }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: Date)
}>()

const getDateKey = (date: Date) => dayjs(date).format('YYYY-MM-DD')

const currentDate = computed(() => new Date())
const currentDateKey = computed(() => getDateKey(currentDate.value))
const selectedDateKey = computed(() => getDateKey(props.modelValue) || '')

const handleSelectDay = (weekDay: CalendarWeeklyDaysDayType) => {
  emit('update:modelValue', weekDay.raw)
}
</script>
