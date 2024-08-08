<template>
  <div class="flex items-center">
    <div class="h-24 w-24 text-main-primary">
      <slot name="icon">
        <SvgCalendar />
      </slot>
    </div>

    <div class="ml-10 truncate text-medium-17 laptop:text-medium-14">
      <span>{{ title }}</span>
      <template v-if="selectedDate">
        <span>:</span>
        <span :title="resultDateTimeString" class="ml-5">
          {{ resultDateTimeString }}
        </span>
      </template>
    </div>

    <TaskFormModalDatePickerClearButton
      v-if="resultDatetime"
      title="xx xx xx xx xx"
      class="ml-auto"
      @click="reset"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

import TaskFormModalDatePickerClearButton from '@/components/ButtonCircleClear.vue'

const props = defineProps({
  title: { type: String, required: true },
  resultDatetime: { type: Date, default: undefined },
  selectedDate: { type: Date, default: undefined }
})

const emit = defineEmits<{
  (n: 'reset')
}>()

const resultDateTimeString = computed(() => {
  return dayjs(props.resultDatetime).calendar(null, {
    sameDay: '[xx xx] HH:mm',
    nextDay: '[xx xx] HH:mm',
    nextWeek: 'DD.MM.YYYY xx HH:mm',
    lastDay: '[xx xx] HH:mm',
    lastWeek: 'DD.MM.YYYY xx HH:mm',
    sameElse: 'DD.MM.YYYY xx HH:mm'
  })
})

const reset = () => emit('reset')
</script>
