<template>
  <div>
    <VDatePicker
      :ref="registerSafeRef"
      v-bind="$attrs"
      :model-value="modelValue"
      :attributes="calendarAttributes"
      :locale="locale"
      :popover="{ placement: 'top-end' }"
      :is-range="range"
      title-position="left"
      class="calendar-popover app-calendar"
      @update:modelValue="value => emit('update:modelValue', value)"
    >
      <template v-if="asPopover" #default="{ togglePopover }">
        <ButtonIcon
          :color="'#4293F2'"
          class="!rounded-5 !py-5 !px-8 laptop:!py-3"
          @click="togglePopover"
        >
          <SvgCalendar class="h-28 w-28" />
        </ButtonIcon>
      </template>

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
    </VDatePicker>
  </div>
</template>

<script setup lang="ts">
import 'v-calendar/dist/style.css'

import { DatePicker as VDatePicker } from 'v-calendar'
import { computed } from 'vue'

import ButtonIcon from '@/components/ButtonIcon.vue'
import { CalendarComponent } from '@/components/CalendarApp'
import CalendarButtonToday from '@/components/CalendarButtonToday.vue'
import CalendarWeeklyControlsArrow from '@/components/CalendarWeeklyControlsArrow.vue'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

const locale = {
  masks: { weekdays: 'WW', title: 'MMMM, YYYY' }
}

const props = defineProps({
  attributes: { type: Array, default: null },
  modelValue: { type: null, default: null },
  asPopover: { type: Boolean, default: false },
  range: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (n: 'update:modelValue', t: Date)
}>()

const { elementRef: calendarRef, registerSafeRef } =
  useSafeTemplateRef<CalendarComponent>()

const calendarAttributes = computed(() => {
  return [...(props.attributes || [])]
})

const setToday = async () => {
  await calendarRef.value?.move(new Date())
  emit('update:modelValue', new Date())
}
</script>

<style>
@import '@/assets/css/calendar.css';

.calendar-popover {
  @apply mx-0;

  .vc-container {
    @apply px-6 pb-6;
  }

  .vc-header {
    @apply laptop:h-30;
  }

  .vc-arrows-container {
    @apply laptop:pt-0;
  }

  .vc-day {
    @apply !px-0 !text-black/60;

    &.is-not-in-month {
      @apply text-black/30;
    }

    &.is-today {
      .vc-day-content {
        @apply relative;

        &::after {
          @apply absolute bottom-15 h-5 w-full text-center text-main-primary;
          content: '\2022';
        }
      }
    }
  }

  .vc-popover-content {
    @apply mt-16 rounded-12 border-0;
    box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.04);
  }

  .vc-popover-caret {
    @apply hidden;
  }

  .vc-title {
    @apply !text-black !text-medium-17 laptop:!text-medium-14;
  }

  .vc-weekday {
    @apply !text-black text-15;
  }

  .vc-day-content {
    @apply border-2 !text-17 laptop:!text-14;
  }

  .vc-day-content {
    @apply h-40 w-40 !font-normal;
  }

  /* DAY CELL HIGHLIGHT */

  .vc-highlights {
    --blue-600: #4293f2;
    --blue-700: #4293f2;
    --blue-200: #ecf4fd;

    @apply h-40 w-48;

    .vc-highlight {
      @apply h-40 w-40;

      &.vc-highlight-base-start,
      &.vc-highlight-base-end {
        @apply !h-28 !w-20;
      }

      &.vc-highlight-base-middle {
        @apply !h-28 !w-48;
      }
    }
  }
}
</style>
