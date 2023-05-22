<template>
  <div class="flex space-x-5 lg:space-x-10">
    <InputTimeHeadless
      v-model="timeModel"
      input-class="w-80 h-full text-center text-black text-15 placeholder-main-placeholder !bg-main-primary/10 rounded-10 no-default-ring transition-opacity laptop:text-14"
      :class="{
        'opacity-30': disabled
      }"
      :disabled="disabled"
    />

    <InputTimeSelectorButton
      :disabled="disabled || reachMinTime"
      @click="decreaseTime"
    >
      <SvgArrowLeft class="h-15" />
    </InputTimeSelectorButton>

    <InputTimeSelectorButton
      :disabled="disabled || reachMaxTime"
      @click="increaseTime"
    >
      <SvgArrowRight class="h-15" />
    </InputTimeSelectorButton>
  </div>
</template>

<script setup lang="ts">
import { computed, WritableComputedRef } from 'vue'

import InputTimeHeadless from '@/components/InputTimeHeadless.vue'
import InputTimeSelectorButton from '@/components/InputTimeSelectorButton.vue'

const STEP_IN_MINUTES = 5

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 60 * 24 },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: number)
}>()

const timeModel: WritableComputedRef<number> = computed({
  get: (): number => {
    return props.modelValue
  },
  set: (value: number) => {
    emit('update:modelValue', value)
  }
})

const reachMaxTime = computed(() => props.modelValue === props.max)
const reachMinTime = computed(() => props.modelValue === props.min)

const increaseTime = () => {
  const newValue = timeModel.value + STEP_IN_MINUTES
  timeModel.value = newValue > props.max ? props.max : newValue
}
const decreaseTime = () => {
  const newValue = timeModel.value - STEP_IN_MINUTES
  timeModel.value = newValue < props.min ? props.min : newValue
}
</script>
