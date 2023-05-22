<template>
  <div>
    <label :for="id" class="block text-black/40 text-17 laptop:text-14">
      {{ label }}
    </label>

    <slot :id="id"></slot>
  </div>
</template>

<script setup lang="ts">
import { getUniqueString } from '@/utils/random'

defineProps({
  label: { type: String, default: '' },
  id: { type: String, default: () => getUniqueString() }
})
</script>
