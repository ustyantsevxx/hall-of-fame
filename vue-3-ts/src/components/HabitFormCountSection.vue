<template>
  <FormGroup label="Количество повторов">
    <div class="flex space-x-10">
      <input
        v-model.number="habitDataStore.habit.current_goal"
        type="number"
        min="0"
        class="no-default-ring no-spinbutton w-70 border-b border-black/10 bg-transparent pb-5 placeholder-black/20 text-19 laptop:text-14"
      />

      <Select
        v-model="habitDataStore.habit.repeat_type_id"
        class="grow"
        :options="repeatingTypeOptions"
      />
    </div>
  </FormGroup>
</template>

<script setup lang="ts">
import { HABIT_REPEATING_TYPES } from '@/api/modules/habits/constants'
import FormGroup from '@/components/FormGroup.vue'
import Select from '@/components/Select.vue'
import { useHabitDataStore } from '@/stores/habit-data'

const habitDataStore = useHabitDataStore()
habitDataStore.habit.current_goal = 1

const repeatingTypeOptions = [
  { title: 'Раз', value: HABIT_REPEATING_TYPES.TIMES },
  { title: 'Шт.', value: HABIT_REPEATING_TYPES.PIECES },
  { title: 'Повторов', value: HABIT_REPEATING_TYPES.REPEAT },
  { title: 'Км.', value: HABIT_REPEATING_TYPES.KM }
]
</script>
