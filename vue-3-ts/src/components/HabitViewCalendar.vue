<template>
  <div>
    <div
      class="mt-20 flex justify-center rounded-15 bg-white pt-4 pb-7"
      style="box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.04)"
    >
      <CalendarProgress :days="days" :success-ranges="successRanges" />
    </div>

    <CalendarProgressLegend class="mt-16" />
  </div>
</template>

<script setup lang="ts">
import {
  CalendarProgressDay,
  CalendarProgressDayStatus,
  CalendarProgressSuccessRange
} from '@/components/CalendarProgress.types'
import CalendarProgress from '@/components/CalendarProgress.vue'
import CalendarProgressLegend from '@/components/CalendarProgressLegend.vue'

// TODO add CalendarProgress days and successRanges props

const days: CalendarProgressDay[] = [
  {
    raw: new Date('2022-02-07'),
    progress: 100,
    status: CalendarProgressDayStatus.InProgress
  },
  {
    raw: new Date('2022-02-08'),
    progress: 100,
    status: CalendarProgressDayStatus.InProgress
  },
  {
    raw: new Date('2022-02-09'),
    progress: 100,
    status: CalendarProgressDayStatus.InProgress
  },
  {
    raw: new Date('2022-02-10'),
    progress: 100,
    status: CalendarProgressDayStatus.InProgress
  }
]

const successRanges: CalendarProgressSuccessRange[] = [
  {
    dates: {
      start: new Date('2022-02-07'),
      end: new Date('2022-02-10')
    }
  }
]
</script>
