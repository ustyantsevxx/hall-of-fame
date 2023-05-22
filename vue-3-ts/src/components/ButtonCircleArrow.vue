<template>
  <div class="flex items-center justify-between">
    <button
      class="flex h-30 w-30 items-center justify-center rounded-full border border-main-primary/20 transition-colors hover:border-main-primary/50 active:border-main-primary/30"
      :class="{ 'rotate-180': right }"
      @click="emit('click')"
    >
      <SvgArrowLeft class="mr-2 h-12 w-8 text-main-primary" />
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  right: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (e: 'click')
}>()
</script>
