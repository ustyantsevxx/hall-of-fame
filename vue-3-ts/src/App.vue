<template>
  <VueQueryProvider>
    <RouterView />

    <ModalsContainer />
  </VueQueryProvider>
</template>

<script setup lang="ts">
import VueQueryProvider from '@/components/VueQueryProvider.vue'
</script>
