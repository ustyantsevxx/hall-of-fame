<template>
  <button
    class="app-button group"
    :class="[
      {
        'cursor-not-allowed': loading || disabled,
        'hover:brightness-95': !loading && !disabled
      },
      variant
    ]"
    :disabled="disabled"
  >
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <SvgLoader class="animate-spin text-current" />
    </span>

    <span
      class="flex items-center justify-center"
      :class="{ invisible: loading }"
    >
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { ButtonSize, ButtonTheme } from '@/components/Button.types'

defineProps({
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  variant: { type: String as PropType<ButtonTheme>, default: 'regular' },
  size: { type: String as PropType<ButtonSize>, default: 'regular' }
})
</script>

<style>
.app-button {
  @apply relative block select-none rounded-13 bg-white py-10 px-30 text-main-primary transition text-17 laptop:py-13 laptop:text-medium-14;

  &.sm {
    @apply !text-15;
  }

  &.regular {
    @apply bg-white text-main-primary;
  }

  &.primary {
    @apply !bg-main-primary !text-white;

    &:disabled {
      @apply !bg-opacity-60;
    }
  }

  &.stroke-primary {
    @apply border border-main-primary text-main-primary;

    &:disabled {
      @apply border border-main-primary/70 text-main-primary/70;
    }
  }

  &.stroke-cancel {
    @apply border border-subcolor-orange-cancel text-subcolor-orange-cancel;

    &:disabled {
      @apply border border-subcolor-orange-cancel/70 text-subcolor-orange-cancel/70;
    }
  }
}
</style>
