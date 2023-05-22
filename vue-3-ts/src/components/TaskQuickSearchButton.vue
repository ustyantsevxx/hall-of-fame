<template>
  <button
    class="flex h-40 w-45 items-center justify-center rounded-5 border-2 transition-colors md:hidden"
    :class="[
      resultVisible
        ? 'border-0 bg-main-primary text-white hover:bg-main-primary/80 active:bg-main-primary/90'
        : 'border-black/5 text-main-placeholder hover:text-black/30 active:text-black/40'
    ]"
    type="button"
  >
    <SvgSearch28 class="max-h-[24px] max-w-[24px]" />
  </button>
</template>

<script setup lang="ts">
defineProps({
  resultVisible: { type: Boolean, default: false }
})
</script>
