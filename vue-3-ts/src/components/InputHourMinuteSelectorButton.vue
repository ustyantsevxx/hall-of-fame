<template>
  <button
    class="h-24 w-24 rounded-full text-main-placeholder transition-colors"
    :class="{
      'hover:bg-black/5 hover:text-black/50 active:text-black/80': !disabled
    }"
    type="button"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
defineProps({
  disabled: { type: Boolean, default: false }
})
</script>
