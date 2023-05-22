<template>
  <div class="flex items-center justify-center">
    <InputTimeOneSlot
      :model-value="hours"
      format="HH"
      :max="23"
      :format-value-fn="e => e.hours"
      :disabled="disabled"
      @update:modelValue="handleHoursChange"
    />
    <InputTimeOneSlot
      :model-value="minutes"
      class="ml-20"
      format="mm"
      :max="59"
      :format-value-fn="e => e.minutes"
      :disabled="disabled"
      @update:modelValue="handleMinutesChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import InputTimeOneSlot from '@/components/InputTimeOneSlot.vue'

const props = defineProps({
  modelValue: { type: Number, required: true },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits<{
  (e: 'update:modelValue', v: number)
}>()

const hours = computed(() => Math.floor(props.modelValue / 60))
const minutes = computed(() => props.modelValue % 60)

const handleHoursChange = hoursValue => {
  emit('update:modelValue', Number(hoursValue) * 60 + Number(minutes.value))
}

const handleMinutesChange = minutesValue => {
  emit('update:modelValue', Number(hours.value) * 60 + Number(minutesValue))
}
</script>
