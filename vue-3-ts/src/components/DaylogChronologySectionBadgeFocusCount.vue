<template>
  <DaylogChronologyItemBadge>
    <div class="flex items-center">
      <SvgFocus />
      <span class="ml-5 mr-2 text-black text-13">
        {{ count }}
      </span>
    </div>
  </DaylogChronologyItemBadge>
</template>

<script setup lang="ts">
import DaylogChronologyItemBadge from '@/components/DaylogChronologySectionBadge.vue'

defineProps({
  count: { type: Number, required: true }
})
</script>
