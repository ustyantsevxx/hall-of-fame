<template>
  <TaskFormFieldDatetime
    v-bind="$attrs"
    :modal-initial-value="initialValue"
    label="xx xx xx"
    modal-title="xx xx xx"
  >
    <template #icon>
      <SvgCalendar />
    </template>

    <template #modal-after-title="{ date, selectDate }">
      <SuggestionsSlider
        :model-value="date"
        :items="dateVariants"
        class="!-mx-12 mt-15 !pl-12"
        @update:modelValue="selectDate"
      />
    </template>
  </TaskFormFieldDatetime>
</template>

<script setup lang="ts">
import { useTimeoutPoll } from '@vueuse/core'
import dayjs from 'dayjs'
import { ref } from 'vue'

import SuggestionsSlider from '@/components/SuggestionsSlider.vue'
import TaskFormFieldDatetime from '@/components/TaskFormFieldDatetime.vue'

const initialValue = ref(new Date())
useTimeoutPoll(() => {
  initialValue.value = new Date()
}, 1000)

const dateVariants = [
  {
    label: 'xx',
    isActive: value => dayjs(value).isToday(),
    getValue: () => new Date()
  },
  {
    label: 'xx',
    isActive: value => dayjs(value).isTomorrow(),
    getValue: () => dayjs().add(1, 'day').toDate()
  },
  {
    label: 'xx xx',
    isActive: value => dayjs(value).week() - dayjs().week() === 1,
    getValue: () => dayjs().add(1, 'week').startOf('week').toDate()
  }
]
</script>
