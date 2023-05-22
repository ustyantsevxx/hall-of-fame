<template>
  <div class="group-container" :class="[variant]">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { RadioGroupType } from '@/components/RadioGroup.types'

defineProps({
  variant: { type: String as PropType<RadioGroupType>, default: 'flat' }
})
</script>

<style scoped>
.group-container {
  &.flat {
    @apply flex space-x-25 overflow-x-auto overflow-y-hidden border-b border-black/5;
  }

  &.button-group,
  &.button-group-shadow {
    @apply flex w-full space-x-4 overflow-x-auto rounded-5 bg-black/5 p-3;
  }
}
</style>
