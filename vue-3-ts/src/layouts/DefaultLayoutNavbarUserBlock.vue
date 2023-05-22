<template>
  <div class="flex w-full items-center px-20" :title="user?.username">
    <div
      class="flex min-h-[32px] min-w-[32px] items-center justify-center rounded-full text-black"
      style="background: rgba(0, 0, 0, 0.05)"
    >
      <span class="text-[14px] leading-[19px]">
        {{ nameFirstLetterUppercase }}
      </span>
    </div>

    <div class="ml-16 flex h-40 w-full items-center">
      <p
        class="overflow-hidden text-ellipsis pr-28 text-black text-15 laptop:text-[14px] laptop:leading-[17px]"
      >
        {{ user?.username }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

import { useUserStore } from '@/stores/user'

const { user } = storeToRefs(useUserStore())

const nameFirstLetterUppercase = computed(() => {
  return user?.value?.username?.[0]?.toUpperCase() ?? ''
})
</script>
