<template>
  <div>
    <FormGroup label="xx xx">
      <Select
        v-model="habitDataStore.habit.ending_type_id"
        :options="endingOptions"
      />

      <InputDatePicker
        v-if="needToSelectedCertainDate"
        v-model="habitDataStore.habit.end_date"
        label="xx xx"
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
  { title: 'xx xx', value: HABIT_ENDING_TYPES.INDEFINITE },
  { title: 'xx 21 xx', value: HABIT_ENDING_TYPES.AFTER_21_DAYS },
  { title: 'xx 100 xx', value: HABIT_ENDING_TYPES.AFTER_100_DAYS },
  { title: 'xx xx xx', value: HABIT_ENDING_TYPES.ON_DATE }
]

const currentEndingType = computed(() => habitDataStore.habit.ending_type_id)
const needToSelectedCertainDate = computed(() => {
  return currentEndingType.value === HABIT_ENDING_TYPES.ON_DATE
})

watch(currentEndingType, () => {
  habitDataStore.habit.end_date = undefined
})
</script>
