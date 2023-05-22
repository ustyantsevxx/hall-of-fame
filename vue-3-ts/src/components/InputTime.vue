<template>
  <InputTimeHeadless
    input-class="w-80 text-center border py-6 text-17 text-main-primary border-main-primary/20 rounded-10 no-default-ring placeholder-main-primary laptop:text-14"
    :model-value="modelValue"
    @update:model-value="value => emit('update:modelValue', value)"
  />
</template>

<script setup lang="ts">
import InputTimeHeadless from '@/components/InputTimeHeadless.vue'

defineProps({
  modelValue: { type: Number, default: 0 }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: number)
}>()
</script>
