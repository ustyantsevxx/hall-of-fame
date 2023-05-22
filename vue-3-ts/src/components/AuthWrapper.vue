<template>
  <div class="flex grow items-center justify-center p-20">
    <div class="w-[463px] rounded-[20px] bg-main-primary px-36 p-20 text-white">
      <div class="mb-28 flex items-center space-x-6">
        <SvgLogo class="h-36 w-36" />
        <p class="text-[18px] font-medium">xxx</p>
      </div>

      <h1 class="text-[26px] font-bold leading-[30px]">{{ title }}</h1>

      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: { type: String, required: true }
})
</script>
