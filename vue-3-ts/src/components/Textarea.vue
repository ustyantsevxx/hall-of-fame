<template>
  <textarea
    :value="modelValue"
    class="no-default-ring resize-none placeholder-[#D1D1D1] text-15 laptop:text-14"
    @input="emitVModel"
  ></textarea>
</template>

<script setup lang="ts">
import { EventWithAnyTarget } from '@/types/utils'

defineProps({
  modelValue: { type: String, required: true }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: any)
}>()

const emitVModel = (event: EventWithAnyTarget) => {
  emit('update:modelValue', event.target.value)
}
</script>
