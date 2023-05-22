<template>
  <ul>
    <Error v-for="error in errors" :key="error" as="li">{{ error }}</Error>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import Error from '@/components/Error.vue'

defineProps({
  errors: { type: Array as PropType<string[]>, required: true }
})
</script>
