<template>
  <button
    class="group flex rounded-6 px-5 transition-colors hover:text-black/60 active:text-black/80 lg:px-15"
    :title="dayTitle"
  >
    <span
      class="flex h-35 w-60 items-center lg:w-66"
      :class="[{ 'justify-end': last, 'justify-center': !first && !last }]"
    >
      <span
        class="capitalize text-17 laptop:!text-[14px] laptop:!leading-[25px]"
      >
        <span v-if="selected || active">{{ dayName }},</span>
        <span v-else>{{ dayName }}, {{ dayNumber }}</span>
      </span>

      <span
        v-if="selected || active"
        class="relative ml-4 flex h-26 w-26 items-center justify-center rounded-full border-2 transition-colors lg:h-35 lg:w-35 laptop:h-26 laptop:w-26 laptop:text-14"
        :class="{
          'border-black/5 text-black/60 text-14 lg:text-15':
            active && !selected,
          'bg-main-primary text-white text-14 lg:text-15': selected,
          'text-17 group-hover:bg-main-primary/10': !selected && !active
        }"
      >
        {{ dayNumber }}

        <span
          v-if="active"
          class="absolute bottom-1 block text-[20px] leading-[4px] text-main-primary shift-center-x"
        >
          &#8226;
        </span>
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

const props = defineProps({
  active: { type: Boolean, default: false },
  selected: { type: Boolean, default: false },
  first: { type: Boolean, default: false },
  last: { type: Boolean, default: false },
  day: { type: Date, required: true }
})

const dayName = computed(() => dayjs(props.day).format('dd'))
const dayNumber = computed(() => dayjs(props.day).date())
const dayTitle = computed(() => dayjs(props.day).format('DD.MM.YYYY'))
</script>
