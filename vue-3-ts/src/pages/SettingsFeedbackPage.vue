<template>
  <div
    class="grid grid-cols-2 gap-20 laptop:max-w-[266px] laptop:grid-cols-1 laptop:gap-16"
  >
    <a :href="INSTAGRAM_LINK" target="_blank">
      <BannerSubscribeToInstagram />
    </a>

    <a :href="`mailto:${FEEDBACK_MAIL}`">
      <BannerAskQuestion />
    </a>
  </div>
</template>

<script setup lang="ts">
import { FEEDBACK_MAIL, INSTAGRAM_LINK } from '@/api/shared/constants'
import BannerAskQuestion from '@/components/BannerAskQuestion.vue'
import BannerSubscribeToInstagram from '@/components/BannerSubscribeToInstagram.vue'
</script>
