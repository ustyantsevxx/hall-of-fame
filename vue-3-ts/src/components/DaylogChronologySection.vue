<template>
  <Component :is="sectionComponentByType" :item="item" />
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import {
  ChronologySection,
  ChronologySectionType
} from '@/components/DaylogChronology.types'
import DaylogChronologySectionHabit from '@/components/DaylogChronologySectionHabit.vue'
import DaylogChronologySectionTimer from '@/components/DaylogChronologySectionTimer.vue'

const props = defineProps({
  item: { type: Object as PropType<ChronologySection>, required: true }
})

const sectionComponentByType = computed<any>(() => {
  const config = {
    [ChronologySectionType.HabitSection]: DaylogChronologySectionHabit,
    [ChronologySectionType.TimerTimeInterval]: DaylogChronologySectionTimer
  }

  return config[(props.item as ChronologySection).type]
})
</script>
