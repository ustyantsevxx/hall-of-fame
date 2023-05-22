<template>
  <div class="mt-32">
    <div class="flex justify-between">
      <span class="text-medium-15">Награды</span>

      <RouterLink to="/" class="text-main-primary text-15">
        Показать все
      </RouterLink>
    </div>

    <div class="mt-18 flex justify-between">
      <AchievementCard variant="day-7" class="w-95" />
      <AchievementCard variant="day-21" :count="5" class="w-95" />
      <AchievementCard variant="day-30" class="w-95" />
    </div>
  </div>
</template>

<script setup lang="ts">
import AchievementCard from '@/components/AchievementCard.vue'
</script>
