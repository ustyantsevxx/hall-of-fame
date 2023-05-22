<template>
  <button
    class="transition-opacity hover:opacity-80 active:opacity-50"
    @click="e => emit('click', e)"
  >
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', args: MouseEvent)
}>()
</script>
