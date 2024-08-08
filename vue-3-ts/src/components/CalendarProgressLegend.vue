<template>
  <div class="flex justify-between space-x-13 lg:justify-start">
    <div class="flex items-center">
      <CalendarProgressCircle :size="14" :percent="0" />
      <span class="ml-4 whitespace-nowrap text-black/40 text-13">- xx</span>
    </div>
    <div class="flex items-center">
      <CalendarProgressCircle :size="14" :percent="100" />
      <span class="ml-4 whitespace-nowrap text-black/40 text-13">- xx</span>
    </div>
    <div class="flex items-center truncate">
      <div class="h-14 w-14">
        <CalendarProgressCircle :size="14" error />
      </div>
      <div class="ml-4 w-85 truncate text-black/40 text-13" title="xx xx">
        - xx xx
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CalendarProgressCircle from '@/components/CalendarProgressCircle.vue'
</script>
