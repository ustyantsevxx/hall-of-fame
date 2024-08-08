<template>
  <div class="flex space-x-10">
    <CalendarWeeklyControlsArrow @click="emit('previous')">
      <SvgArrowLeft class="h-full" />
    </CalendarWeeklyControlsArrow>

    <button
      class="rounded-6 bg-main-primary/10 px-9 py-5 text-main-primary transition-colors text-15 hover:bg-main-primary/20 active:bg-main-primary/30 laptop:text-14"
      @click="emit('current')"
    >
      xx
    </button>

    <CalendarWeeklyControlsArrow @click="emit('next')">
      <SvgArrowRight class="h-full" />
    </CalendarWeeklyControlsArrow>
  </div>
</template>

<script setup lang="ts">
import CalendarWeeklyControlsArrow from '@/components/CalendarWeeklyControlsArrow.vue'

const emit = defineEmits<{
  (e: 'previous')
  (e: 'next')
  (e: 'current')
}>()
</script>
