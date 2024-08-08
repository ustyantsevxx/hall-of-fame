<template>
  <div class="flex items-center justify-between lg:space-x-16">
    <button
      v-for="mood in moods"
      :key="mood"
      :title="moodTitles[mood]"
      :class="{
        'hover:opacity-80': modelValue !== +mood
      }"
      class="flex h-45 w-45 flex-grow items-center justify-center rounded-full transition-opacity"
      type="button"
      @click="selectMood(+mood)"
    >
      <span
        class="flex h-40 w-40 items-center justify-center rounded-full bg-black/10 transition-colors"
        :style="{
          backgroundColor:
            modelValue === +mood ? MOOD_COLORS[mood] : 'transparent'
        }"
      >
        <MoodIcon
          class="h-30 w-30 transition-colors"
          :type="mood"
          :style="{
            color: modelValue === +mood ? '#ffffff' : MOOD_COLORS[mood]
          }"
        />
      </span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { TIME_INTERVAL_MOOD } from '@/api/modules/time-intervals/constants'
import { MOOD_COLORS } from '@/components/MoodIcon.types'
import MoodIcon from '@/components/MoodIcon.vue'

defineProps({
  modelValue: {
    type: Number as PropType<number | null>,
    default: null
  }
})

const moods = [
  TIME_INTERVAL_MOOD.VERY_BAD,
  TIME_INTERVAL_MOOD.BAD,
  TIME_INTERVAL_MOOD.NORMAL,
  TIME_INTERVAL_MOOD.GOOD,
  TIME_INTERVAL_MOOD.VERY_GOOD
]

const moodTitles: Record<number, string> = {
  [TIME_INTERVAL_MOOD.VERY_BAD]: 'xx xx',
  [TIME_INTERVAL_MOOD.BAD]: 'xx',
  [TIME_INTERVAL_MOOD.NORMAL]: 'xx',
  [TIME_INTERVAL_MOOD.GOOD]: 'xx',
  [TIME_INTERVAL_MOOD.VERY_GOOD]: 'xx xx'
}

const emit = defineEmits<{
  (e: 'update:modelValue', v: number)
}>()

const selectMood = (mood: number) => {
  emit('update:modelValue', mood)
}
</script>
