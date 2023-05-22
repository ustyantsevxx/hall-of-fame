<template>
  <div ref="root" class="app-progressbar overflow-hidden rounded-12"></div>
</template>

<script setup lang="ts">
import ProgressBar from 'progressbar.js'
import { computed, onMounted, PropType, ref, watch } from 'vue'

import { ProgressBarTypes } from '@/components/ProgressBar.types'

const props = defineProps({
  percent: { type: Number, default: 0 },
  duration: { type: Number, default: 1000 },
  strokeWidth: { type: Number, default: 1 },
  trailWidth: { type: Number, default: 1 },
  strokeColor: { type: String, required: true },
  trailColor: { type: String, required: true },
  easing: { type: String, default: 'easeInOut' },
  type: { type: String as PropType<ProgressBarTypes>, required: true }
})

let progressbar

const root = ref(null)

const progressbarOptions = computed(() => {
  return {
    strokeWidth: props.strokeWidth,
    color: props.strokeColor,
    duration: props.duration,
    easing: props.easing,
    trailColor: props.trailColor,
    trailWidth: props.trailWidth
  }
})
const progress = computed(() => props.percent / 100)

const mountByType: Record<ProgressBarTypes, () => void> = {
  line: () => {
    progressbar = new ProgressBar.Line(root.value, progressbarOptions.value)
  },
  circle: () => {
    progressbar = new ProgressBar.Circle(root.value, progressbarOptions.value)
  }
}

const mountProgressbar = () => {
  mountByType[props.type]()

  progressbar.path.style.strokeLinecap = 'round'

  progressbar.animate(progress.value, progressbarOptions.value)
}

watch(
  () => props.type,
  () => {
    progressbar.destroy()
    mountProgressbar()
  }
)

watch(
  () => progress.value,
  () => {
    progressbar.animate(progress.value, progressbarOptions.value)
  }
)

watch(
  () => progressbarOptions.value,
  () => progressbar.animate(progress.value, progressbarOptions.value)
)

onMounted(() => {
  mountProgressbar()
})
</script>

<style>
.app-progressbar > svg {
  @apply h-full;
}
</style>
