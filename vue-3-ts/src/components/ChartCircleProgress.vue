<template>
  <div
    class="chart-circle-progress"
    :style="{
      width: `${size}px`,
      height: `${size}px`
    }"
  >
    <CircleProgress
      v-for="(item, index) in chartItems"
      :key="`${item.color}.${index}`"
      :percent="item.value"
      :size="item.size"
      :border-bg-width="12"
      :border-width="12"
      :transition="1000"
      :fill-color="item.color"
      :empty-color="item.color"
      class="!absolute !shift-center"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import CircleProgress from 'vue3-circle-progress'

import { ChartCircleProgressItem } from '@/components/ChartCircleProgress.types'

const SIZE_STEP = 30

const props = defineProps({
  size: { type: Number, required: true },
  items: { type: Array as PropType<ChartCircleProgressItem[]>, required: true }
})

const chartItems = computed(() => {
  return props.items.map((n, index) => {
    const size = props.size - SIZE_STEP * index

    return {
      size: size > 0 ? size : 1,
      value: n.value,
      color: n.color
    }
  })
})
</script>

<style>
.chart-circle-progress {
  @apply relative;

  circle:first-child {
    @apply opacity-20;
  }
}
</style>
