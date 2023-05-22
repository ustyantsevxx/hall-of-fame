<template>
  <div
    class="flex flex-wrap items-center justify-center rounded-12 bg-main-light-gray"
    :class="[{ 'flex-col': !inline }, inline ? 'px-10 py-5' : 'p-10']"
  >
    <div :class="{ 'ml-8': inline && valueFirst }">
      <slot name="label">
        <span
          class="whitespace-nowrap text-black/40"
          :class="[
            !inline
              ? 'text-13 laptop:text-[12px] laptop:leading-[18px]'
              : 'text-17 laptop:text-[14px] laptop:leading-[25px]'
          ]"
        >
          {{ label }}
        </span>
      </slot>
    </div>

    <div :class="{ 'order-first': valueFirst }">
      <slot name="value">
        <span
          class="whitespace-nowrap text-black"
          :class="[
            { 'ml-8': inline && !valueFirst },
            !inline
              ? 'text-medium-17 laptop:text-14'
              : 'text-medium-17 laptop:text-[14px] laptop:leading-[25px]'
          ]"
        >
          {{ value }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  valueFirst: { type: Boolean, default: false },
  inline: { type: Boolean, default: false },
  value: { type: String, default: undefined },
  label: { type: String, default: undefined }
})
</script>
