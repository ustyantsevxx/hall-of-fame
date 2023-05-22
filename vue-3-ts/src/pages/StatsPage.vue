<template>
  <DefaultLayout>
    <StatsPageDateFilterSection />
    <div class="mt-45 laptop:mt-25">
      <StatsPageCardsGridSection />
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import StatsPageCardsGridSection from '@/pages/StatsPageCardsGridSection.vue'
import StatsPageDateFilterSection from '@/pages/StatsPageDateFilterSection.vue'
</script>
