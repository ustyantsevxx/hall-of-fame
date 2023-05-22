<template>
  <DaylogChronologyItemBadge>
    <MoodIcon :type="type" class="h-20 w-20" />
  </DaylogChronologyItemBadge>
</template>

<script setup lang="ts">
import DaylogChronologyItemBadge from '@/components/DaylogChronologySectionBadge.vue'
import MoodIcon from '@/components/MoodIcon.vue'

defineProps({
  type: { type: Number, required: true }
})
</script>
