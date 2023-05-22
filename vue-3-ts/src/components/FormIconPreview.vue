<template>
  <figure
    class="relative h-55 w-55 shrink-0 rounded-14 transition-colors laptop:h-50 laptop:w-50"
    :style="{ backgroundColor: color }"
  >
    <Transition name="fade">
      <IconGeneric
        :key="icon"
        :icon-name="icon"
        class="absolute text-white shift-center laptop:h-38 laptop:w-38"
      />
    </Transition>
  </figure>
</template>

<script setup lang="ts">
import IconGeneric from '@/components/IconGeneric.vue'

defineProps({
  icon: { type: String, required: true },
  color: { type: String, required: true }
})
</script>
