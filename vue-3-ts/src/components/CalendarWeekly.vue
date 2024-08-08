<template>
  <div>
    <div class="flex items-center">
      <CalendarWeeklyPopover
        :month="displayedMonth"
        :year="displayedYear"
        @update:month="handleMonthChanged"
        @update:year="handleYearChanged"
      />

      <div class="ml-auto mr-30 text-main-primary text-15 laptop:text-14">
        xx {{ displayedWeek }}
      </div>

      <CalendarWeeklyControls
        @previous="displayPreviousWeek"
        @next="displayNextWeek"
        @current="selectAndDisplayCurrentDay"
      />
    </div>

    <CalendarWeeklyDays
      :key="displayedWeek"
      :model-value="modelValue"
      :days="displayedWeekDays"
      class="mt-8 laptop:mt-5"
      @update:modelValue="value => emit('update:modelValue', value)"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'

import { CalendarWeeklyDaysDayType } from '@/components/CalendarWeekly.types'
import CalendarWeeklyControls from '@/components/CalendarWeeklyControls.vue'
import CalendarWeeklyDays from '@/components/CalendarWeeklyDays.vue'
import CalendarWeeklyPopover from '@/components/CalendarWeeklyPopover.vue'
import { getDates } from '@/utils/datetime'

const props = defineProps({
  modelValue: { type: Date, default: null }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date)
}>()

const getWeekStartOfDate = (date?: Date) => dayjs(date).weekday(0).toDate()

const displayedDate = ref(new Date())

watch(
  () => props.modelValue,
  value => {
    displayedDate.value = value
  },
  { immediate: true }
)

const getDateKey = (date: Date) => dayjs(date).format('YYYY-MM-DD')

const getWeekDays = ({
  startDate
}: {
  startDate: Date
}): CalendarWeeklyDaysDayType[] => {
  const WEEK_DAYS_COUNT = 7

  return getDates({ from: startDate, count: WEEK_DAYS_COUNT }).map(date => ({
    key: getDateKey(date),
    raw: date
  }))
}

const firstWeekdayOfDisplayedDateStart = computed(() => {
  return getWeekStartOfDate(displayedDate.value)
})

const displayedWeekDays = computed(() => {
  return getWeekDays({ startDate: firstWeekdayOfDisplayedDateStart.value })
})

const displayedMonth = computed(() => {
  return displayedDate.value.getMonth()
})

const displayedYear = computed(() => {
  return displayedDate.value.getFullYear()
})

const displayedWeek = computed(() => {
  return dayjs(firstWeekdayOfDisplayedDateStart.value).week()
})

const displayPreviousWeek = () => {
  displayedDate.value = dayjs(displayedDate.value)
    .subtract(dayjs.duration({ weeks: 1 }))
    .toDate()
}

const displayNextWeek = () => {
  displayedDate.value = dayjs(displayedDate.value)
    .add(dayjs.duration({ weeks: 1 }))
    .toDate()
}

const selectAndDisplayCurrentDay = () => {
  const today = dayjs()
  displayedDate.value = today.toDate()
  emit('update:modelValue', today.toDate())
}

const handleMonthChanged = (month: number) => {
  displayedDate.value = dayjs(firstWeekdayOfDisplayedDateStart.value)
    .year(displayedYear.value)
    .month(month)
    .date(1)
    .toDate()
}

const handleYearChanged = (year: number) => {
  displayedDate.value = dayjs(firstWeekdayOfDisplayedDateStart.value)
    .year(year)
    .date(1)
    .toDate()
}
</script>
