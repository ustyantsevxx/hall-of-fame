<template>
  <div class="space-y-15">
    <div class="flex items-center justify-between">
      <div class="text-15 laptop:text-14">
        <span class="hidden lg:inline">Начало</span>
        <span class="lg:hidden">Нач</span>
      </div>
      <InputTimeSelector
        :model-value="timeStart"
        :min="minTimeStart"
        :max="maxTimeStart"
        :disabled="disabled"
        @update:modelValue="updateTimeStart"
      />
    </div>

    <div class="flex items-center justify-between">
      <div class="text-15 laptop:text-14">
        <span class="hidden lg:inline">Конец</span>
        <span class="lg:hidden">Кон</span>
      </div>
      <InputTimeSelector
        :model-value="timeEnd"
        :min="minTimeEnd"
        :max="maxTimeEnd"
        :disabled="disabled"
        @update:modelValue="updateTimeEnd"
      />
    </div>

    <div class="flex items-center justify-between">
      <div class="text-15 laptop:text-14">Общее время</div>
      <div class="flex items-end space-x-10">
        <div v-for="timeBlock in differenceTimeBlocks" :key="timeBlock.label">
          <span class="text-medium-23 laptop:text-medium-16">
            {{ timeBlock.value }}
          </span>
          <span class="ml-3 pb-1 text-15 laptop:text-14">
            {{ timeBlock.label }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import InputTimeSelector from '@/components/InputTimeSelector.vue'

const props = defineProps({
  timeStart: { type: Number, default: 0 },
  minTimeStart: { type: Number, default: undefined },
  maxTimeStart: { type: Number, default: undefined },
  timeEnd: { type: Number, default: 0 },
  minTimeEnd: { type: Number, default: undefined },
  maxTimeEnd: { type: Number, default: undefined },
  disabled: { type: Boolean, default: false },
  slim: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (e: 'update:timeStart', v: number)
  (e: 'update:timeEnd', v: number)
}>()

const timeDifferenceInMin = computed(() => {
  return (props.timeEnd || 0) - (props.timeStart || 0)
})

const differenceTimeBlocks = computed(() => {
  const hours = Math.floor(timeDifferenceInMin.value / 60)
  const minutes = Math.floor(timeDifferenceInMin.value % 60)

  return [
    {
      label: 'ч',
      value: hours
    },
    {
      label: 'м',
      value: minutes
    }
  ]
})

const updateTimeStart = (value: number) => {
  emit('update:timeStart', value)

  if (value > props.timeEnd) {
    updateTimeEnd(value)
  }
}
const updateTimeEnd = (value: number) => {
  emit('update:timeEnd', value)

  if (value < props.timeStart) {
    updateTimeStart(value)
  }
}
</script>
