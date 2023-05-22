<template>
  <ChartDayProgress :start-date="startDate" :end-date="endDate" />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

import { HABIT_ENDING_TYPES } from '@/api/modules/habits/constants'
import ChartDayProgress from '@/components/ChartDayProgress.vue'
import { useHabitDataStore } from '@/stores/habit-data'

const habitDataStore = useHabitDataStore()

const startDate = computed(() => {
  return habitDataStore.habit.created_at
    ? new Date(habitDataStore.habit.created_at)
    : new Date()
})
const endDate = computed(() => {
  const dateByEndingType: Record<string, () => Date | undefined> = {
    [HABIT_ENDING_TYPES.ON_DATE]: () => {
      if (habitDataStore.habit.end_date) {
        return new Date(habitDataStore.habit.end_date)
      }
    },
    [HABIT_ENDING_TYPES.AFTER_21_DAYS]: () =>
      dayjs(startDate.value)
        .add(dayjs.duration({ days: 21 }))
        .toDate(),
    [HABIT_ENDING_TYPES.AFTER_100_DAYS]: () =>
      dayjs(startDate.value)
        .add(dayjs.duration({ days: 100 }))
        .toDate()
  }
  return dateByEndingType[habitDataStore.habit.ending_type_id]?.()
})
</script>
