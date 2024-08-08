<template>
  <div class="flex items-center justify-between border-b border-black/10 pb-12">
    <p class="text-black/40 text-17 laptop:text-14">xx xx</p>
    <InputTime v-model="habitDataStore.habit.current_goal" />
  </div>
</template>

<script setup lang="ts">
import InputTime from '@/components/InputTime.vue'
import { useHabitDataStore } from '@/stores/habit-data'

const habitDataStore = useHabitDataStore()
habitDataStore.habit.current_goal = 0
</script>
