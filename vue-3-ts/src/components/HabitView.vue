<template>
  <div class="pb-72">
    <HabitViewCalendar />

    <HabitViewDayProgress class="mt-24" />

    <HabitViewDoneProgress class="mt-32" />

    <!--  TODO xx xx xx xx xx  -->
    <!--    <HabitViewAchievements class="mt-32" />-->

    <HabitViewReminders v-if="remindersVisible" class="mt-42" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// import HabitViewAchievements from '@/components/HabitViewAchievements.vue'
import HabitViewCalendar from '@/components/HabitViewCalendar.vue'
import HabitViewDayProgress from '@/components/HabitViewDayProgress.vue'
import HabitViewDoneProgress from '@/components/HabitViewDoneProgress.vue'
import HabitViewReminders from '@/components/HabitViewReminders.vue'
import { useHabitDataStore } from '@/stores/habit-data'

const habitDataStore = useHabitDataStore()

const remindersVisible = computed(() => {
  return habitDataStore.habit.notification_time?.length > 0
})
</script>
