<template>
  <div>
    <FormGroup label="xx xx">
      <Select v-model="repeatType" :options="repeatTypeOptions" />
    </FormGroup>

    <div
      v-if="repeatType === HABIT_REPEAT_TYPES.BY_DAYS"
      class="mt-20 flex justify-between"
    >
      <button
        v-for="(day, dayIndex) in shortWeekDays"
        :key="dayIndex"
        class="rounded-10 border border-main-primary/20 py-7 px-12 transition-colors text-15 laptop:text-14"
        :class="{
          'text-main-primary':
            !habitDataStore.habit.repeating.includes(dayIndex),
          'bg-main-primary text-white':
            habitDataStore.habit.repeating.includes(dayIndex)
        }"
        type="button"
        @click="toggleDay(dayIndex)"
      >
        {{ day }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { HABIT_REPEAT_TYPES } from '@/api/modules/habits/constants'
import FormGroup from '@/components/FormGroup.vue'
import Select from '@/components/Select.vue'
import { useHabitDataStore } from '@/stores/habit-data'
import { arrayToggle } from '@/utils/array'
import { shortWeekDays } from '@/utils/datetime'

const habitDataStore = useHabitDataStore()

const repeatTypeOptions = [
  { title: 'xx', value: HABIT_REPEAT_TYPES.DAILY },
  { title: 'xx xx', value: HABIT_REPEAT_TYPES.BY_DAYS }
]
const repeatType = ref(HABIT_REPEAT_TYPES.DAILY)
watch(repeatType, value => {
  if (value === HABIT_REPEAT_TYPES.DAILY) {
    habitDataStore.habit.repeating = []
  }
})

const toggleDay = (dayIndex: number) => {
  habitDataStore.habit.repeating = arrayToggle(
    habitDataStore.habit.repeating,
    dayIndex
  )
}
</script>
