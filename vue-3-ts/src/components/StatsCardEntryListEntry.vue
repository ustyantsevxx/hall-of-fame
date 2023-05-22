<template>
  <div
    class="flex h-45 items-center justify-between rounded-8 bg-main-light-gray transition hover:brightness-[98%] active:brightness-[95%] laptop:h-36"
  >
    <div class="ml-19 flex items-center">
      <figure
        class="h-16 w-16 shrink-0 rounded-full"
        :style="{
          backgroundColor: entry.color
        }"
      ></figure>

      <p
        :title="entry.name"
        class="ml-12 w-[270px] truncate text-15 laptop:text-14"
      >
        {{ entry.name }}
      </p>
    </div>

    <div class="mr-8 flex items-center">
      <p class="text-black/40 text-15">
        {{ secondsToTimeString(entry.time, true) }}
      </p>

      <div class="px-7">
        <SvgArrowDisclosure />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { secondsToTimeString } from '@/utils/datetime'

defineProps({
  entry: { type: Object, required: true }
})
</script>
