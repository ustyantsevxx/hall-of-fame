<template>
  <div>
    <FormGroup label="Когда закончить">
      <Select
        v-model="habitDataStore.habit.ending_type_id"
        :options="endingOptions"
      />

      <InputDatePicker
        v-if="needToSelectedCertainDate"
        v-model="habitDataStore.habit.end_date"
        label="Дата окончания"
      />
    </FormGroup>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'

import { HABIT_ENDING_TYPES } from '@/api/modules/habits/constants'
import FormGroup from '@/components/FormGroup.vue'
import InputDatePicker from '@/components/InputDatePicker.vue'
import Select from '@/components/Select.vue'
import { useHabitDataStore } from '@/stores/habit-data'

const habitDataStore = useHabitDataStore()

const endingOptions = [
  { title: 'Бессрочная привычка', value: HABIT_ENDING_TYPES.INDEFINITE },
  { title: 'Через 21 день', value: HABIT_ENDING_TYPES.AFTER_21_DAYS },
  { title: 'Через 100 дней', value: HABIT_ENDING_TYPES.AFTER_100_DAYS },
  { title: 'В определенную дату', value: HABIT_ENDING_TYPES.ON_DATE }
]

const currentEndingType = computed(() => habitDataStore.habit.ending_type_id)
const needToSelectedCertainDate = computed(() => {
  return currentEndingType.value === HABIT_ENDING_TYPES.ON_DATE
})

watch(currentEndingType, () => {
  habitDataStore.habit.end_date = undefined
})
</script>
