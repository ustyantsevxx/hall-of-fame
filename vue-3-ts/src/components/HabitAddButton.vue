<template>
  <div class="flex min-w-[75px] flex-col items-center text-white">
    <button
      class="relative flex h-55 w-55 rounded-15 bg-[#7AB3F6]"
      title="xx xx"
      @click="value => emit('click', value)"
    >
      <SvgPlus class="absolute h-30 w-30 shift-center" />
    </button>

    <span
      class="mt-8 text-center text-main-primary text-15 laptop:text-[15px] laptop:leading-[17px] xl:block"
    >
      xx
      <br />
      xx
    </span>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'click', v: MouseEvent)
}>()
</script>
