<template>
  <div class="flex flex-col items-center space-y-4 laptop:space-y-0">
    <InputHourMinuteSelectorButton
      :disabled="reachedMinTime"
      @click="decreaseTime"
    >
      <SvgArrowUp24 class="h-full w-full" />
    </InputHourMinuteSelectorButton>

    <InputTimeHeadless
      v-model="timeModel"
      :class="{
        'opacity-30': disabled
      }"
      :disabled="disabled"
      :format="format"
      :value-as-time-string-fn="valueAsTimeString"
      :format-value-fn="formatValueFn"
      input-class="no-default-ring text-17 text-center border border-main-placeholder rounded-5 w-47 h-55"
      placeholder="00"
    />

    <InputHourMinuteSelectorButton
      :disabled="reachedMaxTime"
      @click="increaseTime"
    >
      <SvgArrowUp24 class="h-full w-full rotate-180" />
    </InputHourMinuteSelectorButton>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { computed, WritableComputedRef } from 'vue'

import InputHourMinuteSelectorButton from '@/components/InputHourMinuteSelectorButton.vue'
import InputTimeHeadless from '@/components/InputTimeHeadless.vue'

const STEP = 1

const props = defineProps({
  modelValue: { type: Number, default: undefined },
  disabled: { type: Boolean, default: false },
  format: { type: String, default: 'HH' },
  formatValueFn: { type: Function, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, required: true }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: number | undefined)
}>()

const timeModel = useVModel(props, 'modelValue', emit)

const reachedMaxTime = computed(() => props.modelValue === props.max)
const reachedMinTime = computed(() => props.modelValue === props.min)

const increaseTime = () => {
  const newValue = (timeModel.value || 0) + STEP
  timeModel.value = Math.min(props.max, newValue)
}
const decreaseTime = () => {
  const newValue = (timeModel.value || 0) - STEP
  timeModel.value = Math.max(props.min, newValue)
}

const valueAsTimeString = (value: number | null) => {
  if (value === null) {
    return ''
  }

  return value.toString().length === 1 ? `0${value}` : value.toString()
}
</script>
