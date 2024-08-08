<template>
  <div class="mt-42">
    <span class="text-medium-15">xx</span>

    <div class="mt-12 grid auto-cols-max grid-flow-col gap-10">
      <HabitViewRemindersItem
        v-for="time in formattedReminderTimes"
        :key="time"
      >
        {{ time }}
      </HabitViewRemindersItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import HabitViewRemindersItem from '@/components/HabitViewRemindersItem.vue'
import { useHabitDataStore } from '@/stores/habit-data'
import { minutesToTimeString } from '@/utils/datetime'

const habitDataStore = useHabitDataStore()

const formattedReminderTimes = computed(() => {
  return habitDataStore.habit.notification_time.map(t => minutesToTimeString(t))
})
</script>
