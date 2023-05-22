<template>
  <VueTimepicker
    :ref="registerSafeRef"
    manual-input
    class="app-headless-time-input"
    hide-dropdown
    :input-class="inputClass"
    hide-clear-button
    placeholder="00:00"
    :model-value="modelValueAsTimeString"
    @change="emitFormattedValue"
    @blur="skipIfInSkippedValues"
  />
</template>

<script setup lang="ts">
import {
  ComponentPublicInstance,
  computed,
  onMounted,
  PropType,
  watch
} from 'vue'
import VueTimepicker from 'vue3-timepicker'

import {
  InputTimeHeadlessExpose,
  VueTimepickerExpose
} from '@/components/InputTimeHeadless.types'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'
import { minutesToTimeString } from '@/utils/datetime'

// emits value in minutes from midnight
// example: input 13:56 => emits 836 (13 * 60 + 56)

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  inputClass: { type: String, default: undefined },
  skipValues: { type: Array as PropType<number[]>, default: () => [] },
  valueAsTimeStringFn: {
    type: Function,
    default: value => minutesToTimeString(value)
  },
  formatValueFn: {
    type: Function,
    default: ({ hours, minutes }) => {
      return hours * 60 + minutes
    }
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: number)
}>()

const { elementRef: timepickerRef, registerSafeRef } = useSafeTemplateRef<
  ComponentPublicInstance & VueTimepickerExpose
>()

const modelValueAsTimeString = computed(() => {
  return props.valueAsTimeStringFn(props.modelValue)
})

watch(
  () => props.modelValue,
  () => {
    timepickerRef.value?.readStringValues(modelValueAsTimeString.value)
  }
)

const skipIfInSkippedValues = () => {
  if (props.skipValues.includes(props.modelValue)) {
    let newValue = props.modelValue

    while (props.skipValues.includes(newValue)) {
      newValue++
    }

    emit('update:modelValue', newValue)
  }
}

const emitFormattedValue = (e: any) => {
  const hours = +e.data.HH
  const minutes = +e.data.mm
  emit('update:modelValue', props.formatValueFn({ hours, minutes }))
}

const clear = () => {
  timepickerRef.value?.clearTime()
}

defineExpose<InputTimeHeadlessExpose>({
  clear
})

onMounted(() => {
  skipIfInSkippedValues()
})
</script>

<style>
.app-headless-time-input .dropdown,
.controls {
  @apply !hidden;
}

.app-headless-time-input {
  input {
    @apply bg-transparent;
  }
}
</style>
