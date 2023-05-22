<template>
  <button
    type="button"
    class="group flex h-35 w-35 items-center justify-center rounded-[7px] bg-main-primary/10 text-main-primary transition laptop:h-30 laptop:w-30"
    :class="{
      'opacity-30': disabled,
      'hover:bg-main-primary/20': !disabled
    }"
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
