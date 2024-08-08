<template>
  <div class="relative">
    <div
      v-if="count > 1"
      class="absolute right-0 flex h-18 w-18 items-center justify-center rounded-full"
      style="box-shadow: 0 0 3px rgba(0, 0, 0, 0.18)"
    >
      <span class="text-11">{{ `x${count}` }}</span>
    </div>

    <div class="h-82">
      <div class="relative flex h-full w-full justify-center pt-2">
        <Component :is="achievementData.icon" class="h-82 w-70" />
      </div>
    </div>

    <div class="mt-6 text-center text-13" v-html="achievementData.title"></div>

    <div
      v-if="achievementData.subtitle"
      class="text-center text-black/40 text-13"
      v-html="achievementData.subtitle"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import SvgAchievementsDays7 from '@/assets/svg/components/Svg/components/Svg/Achievements/Days7.svg?component'
import SvgAchievementsDays21 from '@/assets/svg/components/Svg/components/Svg/Achievements/Days21.svg?component'
import SvgAchievementsDays30 from '@/assets/svg/components/Svg/components/Svg/Achievements/Days30.svg?component'
import {
  AchievementCardDayVariant,
  AchievementCardDayVariantConfig
} from '@/components/AchievementCard.types'

const props = defineProps({
  count: { type: Number, default: 1 },
  variant: {
    type: String as PropType<AchievementCardDayVariant>,
    required: true
  }
})

const dataByVariant: Record<
  AchievementCardDayVariant,
  AchievementCardDayVariantConfig
> = {
  'day-7': {
    icon: SvgAchievementsDays7,
    title: '7 xx <br> xx xx',
    subtitle: '45 xx'
  },
  'day-21': {
    icon: SvgAchievementsDays21,
    title: '21 xx <br> xx xx',
    subtitle: '45 xx'
  },
  'day-30': {
    icon: SvgAchievementsDays30,
    title: '30 xx <br> xx xx',
    subtitle: '45 xx'
  }
}

const achievementData = computed(() => dataByVariant[props.variant])
</script>
