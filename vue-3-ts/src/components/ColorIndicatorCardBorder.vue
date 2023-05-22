<template>
  <div
    class="flex h-full flex-col items-start"
    :style="{
      color
    }"
  >
    <SvgColorIndicatorUp />

    <div
      class="-my-3 w-5 grow"
      :style="{
        background: color
      }"
    ></div>

    <SvgColorIndicatorDown />
  </div>
</template>

<script setup lang="ts">
defineProps({
  color: { type: String, default: '#000000' }
})
</script>
