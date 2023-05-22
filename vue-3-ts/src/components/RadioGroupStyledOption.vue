<template>
  <span
    class="styled-option"
    :title="item.label"
    :class="[variant, { selected }]"
  >
    {{ item.label }}
  </span>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { RadioGroupItem, RadioGroupType } from '@/components/RadioGroup.types'

defineProps({
  item: { type: Object as PropType<RadioGroupItem>, required: true },
  variant: { type: String as PropType<RadioGroupType>, default: 'flat' },
  selected: { type: Boolean, default: false }
})
</script>

<style scoped>
.styled-option {
  @apply relative block flex-shrink-0 cursor-pointer select-none text-center transition-colors;

  &::before {
    @apply invisible block h-0 overflow-hidden;
    content: attr(title);
  }

  &.flat {
    @apply -mb-1 overflow-hidden overflow-y-hidden whitespace-nowrap pb-8 text-black/50 text-17 hover:text-black laptop:text-14;

    &::before {
      @apply text-medium-17 laptop:text-medium-14;
    }

    &::after {
      @apply absolute bottom-0 left-0 right-0 block h-10 translate-y-1/2 rounded-[30px] bg-main-primary opacity-0 transition-opacity;
      content: '';
    }

    &.selected {
      @apply text-black text-medium-17 laptop:text-medium-14;

      &::after {
        @apply opacity-100;
      }
    }
  }

  &.button-group,
  &.button-group-shadow {
    @apply flex-grow rounded-5 py-5 transition hover:text-black/70 active:text-black/50 laptop:text-14;

    &.selected {
      @apply bg-white !text-main-primary;
    }
  }

  &.button-group-shadow {
    &.selected {
      box-shadow: 0 3px 8px rgba(0, 0, 0, 0.12), 0 3px 1px rgba(0, 0, 0, 0.04);
    }
  }
}
</style>
