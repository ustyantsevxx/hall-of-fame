<template>
  <button
    type="button"
    class="app-button-icon group"
    :class="{
      'cursor-not-allowed': loading || disabled
    }"
    :disabled="disabled"
  >
    <span
      v-if="loading"
      class="absolute inset-0 flex items-center justify-center"
    >
      <SvgLoader class="animate-spin text-black" />
    </span>

    <span :class="{ invisible: loading }" class="block">
      <slot></slot>
    </span>
  </button>
</template>

<script setup lang="ts">
defineProps({
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  color: { type: String, required: true }
})
</script>

<style>
.app-button-icon {
  @apply relative block select-none rounded-10 border p-10 transition;
  border-color: v-bind('color');
  color: v-bind('color');

  &:hover {
    color: #ffffff;
    background-color: v-bind('color');
  }
}
</style>
