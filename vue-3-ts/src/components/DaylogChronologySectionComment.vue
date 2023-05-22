<template>
  <div class="relative">
    <div
      class="relative w-max rounded-10 p-10 pl-16 pb-10 opacity-20 lg:pb-14"
      :style="{ backgroundColor: color }"
    >
      <SvgBottomCenterTip
        class="absolute left-15 -top-7 h-7 w-16"
        :style="{ color }"
      />

      <span class="opacity-0 text-15 laptop:text-[13px] laptop:leading-[20px]">
        <slot></slot>
      </span>
    </div>

    <div
      class="absolute left-0 top-0 w-max rounded-10 bg-transparent p-10 pl-16 pb-14"
    >
      <span
        class="text-black/60 text-15 laptop:text-[13px] laptop:leading-[20px]"
      >
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  color: { type: String, default: '#000000' }
})
</script>
