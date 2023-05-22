<template>
  <Calendar :attributes="successRangesAttributes" class="calendar-progress">
    <template #day="{ day }">
      <div class="relative mx-auto h-40 w-40 select-none">
        <CalendarProgressCircle
          v-if="day.inMonth && checkNeedShowProgress(daysInfo[day.id])"
          :percent="daysInfo[day.id]?.progress || 0"
          :error="daysInfo[day.id]?.status === CalendarProgressDayStatus.Missed"
          :size="39"
          class="!absolute bg-white !shift-center"
        />

        <span
          class="!absolute text-black/60 !shift-center text-15 laptop:text-14"
        >
          {{ day.day }}
        </span>
      </div>
    </template>
  </Calendar>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, PropType } from 'vue'

import Calendar from '@/components/CalendarApp.vue'
import {
  CalendarProgressDay,
  CalendarProgressDayStatus,
  CalendarProgressSuccessRange
} from '@/components/CalendarProgress.types'
import CalendarProgressCircle from '@/components/CalendarProgressCircle.vue'

const props = defineProps({
  days: { type: Array as PropType<CalendarProgressDay[]>, default: () => [] },
  successRanges: {
    type: Array as PropType<CalendarProgressSuccessRange[]>,
    default: () => []
  }
})

const daysInfo = computed<Record<number, CalendarProgressDay>>(() => {
  return Object.fromEntries(
    props.days?.map(d => [dayjs(d.raw).format('YYYY-MM-DD'), d])
  )
})

const successRangesAttributes = computed(() => {
  return props.successRanges?.map(r => ({
    highlight: true,
    ...r
  }))
})

const checkNeedShowProgress = (day?: CalendarProgressDay) => {
  return !!day && day.status !== CalendarProgressDayStatus.Regular
}
</script>

<style>
.calendar-progress {
  /* DAY CELL HIGHLIGHT */
  .vc-highlight {
    @apply !h-2 !bg-main-primary;
  }

  &.on-left {
    .vc-highlight-base-middle,
    .vc-day-box-left-center {
      width: 50%;
      transform: translateX(50%);
    }
  }

  &.on-right {
    .vc-highlight-base-middle,
    .vc-day-box-right-center {
      width: 51%;
      transform: translateX(-50%);
    }
  }
}
</style>
