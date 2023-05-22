<template>
  <Component
    :is="iconOptionsByType.component"
    :style="{
      color: MOOD_COLORS[type]
    }"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { TIME_INTERVAL_MOOD } from '@/api/modules/time-intervals/constants'
import IconMoodBad from '@/assets/svg/components/Svg/MoodBad.svg'
import IconMoodGood from '@/assets/svg/components/Svg/MoodGood.svg'
import IconMoodNormal from '@/assets/svg/components/Svg/MoodNormal.svg'
import IconMoodVeryBad from '@/assets/svg/components/Svg/MoodVeryBad.svg'
import IconMoodVeryGood from '@/assets/svg/components/Svg/MoodVeryGood.svg'
import { MOOD_COLORS } from '@/components/MoodIcon.types'

type IconOptionsConfig = {
  component: any
}

const props = defineProps({
  type: { type: Number, required: true }
})

const config: Record<number, IconOptionsConfig> = {
  [TIME_INTERVAL_MOOD.VERY_BAD]: {
    component: IconMoodVeryBad
  },
  [TIME_INTERVAL_MOOD.BAD]: {
    component: IconMoodBad
  },
  [TIME_INTERVAL_MOOD.NORMAL]: {
    component: IconMoodNormal
  },
  [TIME_INTERVAL_MOOD.GOOD]: {
    component: IconMoodGood
  },
  [TIME_INTERVAL_MOOD.VERY_GOOD]: {
    component: IconMoodVeryGood
  }
}

const iconOptionsByType = computed<IconOptionsConfig>(() => config[props.type])
</script>
