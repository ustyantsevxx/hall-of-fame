<template>
  <span class="flex items-center">
    <span
      class="block h-10 w-10 rounded-full"
      :style="{ 'background-color': color }"
    ></span>

    <span class="ml-8 block text-15 laptop:text-14">{{ text }}</span>
  </span>
</template>

<script setup lang="ts">
defineProps({
  color: { type: String, required: true },
  text: { type: String, required: true }
})
</script>
