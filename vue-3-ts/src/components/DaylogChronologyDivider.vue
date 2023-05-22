<template>
  <div class="flex w-full flex-col">
    <DaylogChronologyDividerLine v-if="lineUp" class="ml-34 grow" />

    <div class="z-10">
      <slot></slot>
    </div>

    <DaylogChronologyDividerLine v-if="lineDown" class="ml-34 grow" />
  </div>
</template>

<script setup lang="ts">
import DaylogChronologyDividerLine from '@/components/DaylogChronologyDividerLine.vue'

defineProps({
  lineUp: { type: Boolean, default: false },
  lineDown: { type: Boolean, default: false }
})
</script>
