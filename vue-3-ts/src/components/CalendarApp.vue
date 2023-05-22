<template>
  <VCalendar
    :ref="registerSafeRef"
    v-bind="$attrs"
    :attributes="calendarAttributes"
    :locale="locale"
    title-position="left"
    class="app-calendar w-full min-w-full lg:min-w-max"
  >
    <template v-if="$slots['day']" #day-content="{ day }">
      <slot name="day" :day="day"></slot>
    </template>

    <template #header-left-button>
      <CalendarWeeklyControlsArrow>
        <SvgArrowLeft class="h-full" />
      </CalendarWeeklyControlsArrow>

      <CalendarButtonToday @click.stop="setToday" />
    </template>

    <template #header-right-button>
      <CalendarWeeklyControlsArrow>
        <SvgArrowRight class="h-full" />
      </CalendarWeeklyControlsArrow>
    </template>
  </VCalendar>
</template>

<script setup lang="ts">
import 'v-calendar/dist/style.css'

import { Calendar as VCalendar } from 'v-calendar'
import { computed } from 'vue'

import { CalendarComponent } from '@/components/CalendarApp'
import CalendarButtonToday from '@/components/CalendarButtonToday.vue'
import CalendarWeeklyControlsArrow from '@/components/CalendarWeeklyControlsArrow.vue'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

const locale = {
  masks: { weekdays: 'WW', title: 'MMMM, YYYY' }
}

const props = defineProps({
  attributes: { type: Array, default: null }
})

const { elementRef: calendarRef, registerSafeRef } =
  useSafeTemplateRef<CalendarComponent>()

const calendarAttributes = computed(() => {
  const todayDot = {
    dot: true,
    dates: [new Date()]
  }

  return [todayDot, ...(props.attributes || [])]
})

const setToday = async () => {
  await calendarRef.value?.move(new Date())
}
</script>

<style>
@import '@/assets/css/calendar.css';
</style>
