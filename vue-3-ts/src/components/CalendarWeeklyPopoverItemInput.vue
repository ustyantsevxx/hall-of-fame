<template>
  <div>
    <div class="flex items-center justify-between space-x-5">
      <CalendarWeeklyControlsArrow @click="emit('previous')">
        <SvgArrowLeft class="h-full" />
      </CalendarWeeklyControlsArrow>

      <CalendarWeeklyPopoverButton
        class="px-4 text-main-primary"
        @click="emit('toggle')"
      >
        {{ headButtonLabel }}
      </CalendarWeeklyPopoverButton>

      <CalendarWeeklyControlsArrow @click="emit('next')">
        <SvgArrowRight class="h-full" />
      </CalendarWeeklyControlsArrow>
    </div>

    <div class="mt-10 grid grid-cols-4 gap-4">
      <CalendarWeeklyPopoverButton
        v-for="item in items"
        :key="item.key"
        class="capitalize transition-colors text-17 laptop:text-14"
        :class="{
          'bg-main-primary text-white hover:bg-main-primary':
            modelValue?.key === item.key
        }"
        @click="emit('update:modelValue', item)"
      >
        {{ item.label }}
      </CalendarWeeklyPopoverButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { ICalendarWeeklyPopoverItem } from '@/components/CalendarWeekly.types'
import CalendarWeeklyControlsArrow from '@/components/CalendarWeeklyControlsArrow.vue'
import CalendarWeeklyPopoverButton from '@/components/CalendarWeeklyPopoverButton.vue'

defineProps({
  modelValue: {
    type: Object as PropType<ICalendarWeeklyPopoverItem>,
    default: null
  },
  headButtonLabel: { type: String, required: true },
  items: {
    type: Array as PropType<ICalendarWeeklyPopoverItem[]>,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: ICalendarWeeklyPopoverItem)
  (e: 'previous')
  (e: 'next')
  (e: 'toggle')
}>()
</script>
