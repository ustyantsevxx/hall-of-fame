<template>
  <Card>
    <div class="relative">
      <ColorIndicatorCardBorder
        :color="color"
        class="absolute -left-1 top-0 h-full"
      />

      <slot></slot>
    </div>
  </Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue'
import ColorIndicatorCardBorder from '@/components/ColorIndicatorCardBorder.vue'

defineProps({
  color: { type: String, default: '#000000' }
})
</script>
