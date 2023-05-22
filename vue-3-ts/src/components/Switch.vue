<template>
  <Switch
    :model-value="modelValue"
    :class="modelValue ? 'bg-main-primary' : 'bg-black/10'"
    class="relative inline-flex h-31 w-51 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors"
    @update:model-value="emitChange"
  >
    <span
      aria-hidden="true"
      :class="modelValue ? 'translate-x-20' : 'translate-x-0'"
      class="no-default-ring pointer-events-none inline-block h-27 w-27 rounded-full bg-white shadow-sm transition"
    ></span>
  </Switch>
</template>

<script setup lang="ts">
import { Switch } from '@headlessui/vue'

defineProps({
  modelValue: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean)
}>()

const emitChange = (value: boolean) => emit('update:modelValue', value)
</script>
