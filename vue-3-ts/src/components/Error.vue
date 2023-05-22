<template>
  <Component
    :is="as"
    class="text-[15px] leading-[15px] text-subcolor-orange-cancel"
  >
    <slot></slot>
  </Component>
</template>

<script setup lang="ts">
defineProps({
  as: { type: String, default: 'div' }
})
</script>
