<template>
  <button
    class="timer-button relative flex h-38 w-38 items-center justify-center rounded-full"
    :title="title"
    @click="toggleRunning"
  >
    <CircleProgress
      :percent="progress"
      :size="32"
      :border-bg-width="2"
      :border-width="2"
      :transition="1000"
      empty-color="rgb(66,147,242, 0.2)"
      class="!absolute !shift-center"
    />

    <span class="absolute shift-center">
      <Transition name="fade">
        <SvgStopButton v-if="running" class="absolute shift-center" />
        <SvgPlayButton v-else class="absolute ml-2 shift-center" />
      </Transition>
    </span>
  </button>
</template>

<script setup lang="ts">
import CircleProgress from 'vue3-circle-progress'

const props = defineProps({
  running: { type: Boolean, default: false },
  progress: { type: Number, default: 0 },
  title: { type: String, required: true }
})
const emit = defineEmits<{
  (e: 'play')
  (e: 'pause')
}>()

const toggleRunning = () => {
  if (props.running) {
    emit('pause')
  } else {
    emit('play')
  }
}
</script>

<style>
.timer-button {
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
}
</style>
