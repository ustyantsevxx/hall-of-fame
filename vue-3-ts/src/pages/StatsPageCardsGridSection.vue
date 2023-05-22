<template>
  <div
    :key="gutter"
    v-masonry
    transition-duration="0.3s"
    item-selector=".stats-card"
    :gutter="gutter"
    v-bind="$attrs"
  >
    <StatsCard
      v-for="item in stats"
      :key="item.id"
      v-masonry-tile
      :item="item"
      class="stats-card mb-15 2xl:mb-30"
      @select-entry="openEntryDrawer"
    />
  </div>

  <DrawerStatsEntry v-model:opened="entryDrawerOpened" :entry="selectedEntry" />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { getStatsEntryMock, StatsService } from '@/api/modules/stats'
import DrawerStatsEntry from '@/components/DrawerStatsEntry.vue'
import StatsCard from '@/components/StatsCard.vue'
import { useWidthBreakpoints } from '@/hooks/useWidthBreakpoints'

const stats = StatsService.getStats()
const entryDrawerOpened = ref(false)
const selectedEntry = ref()

defineEmits<{
  // TODO type
  (e: 'select-entry', v: any)
}>()

const breakpoints = useWidthBreakpoints()

const gutter = computed(() => {
  if (breakpoints['2xl'].value) {
    return 30
  }

  if (breakpoints.laptop.value) {
    return 10
  }

  return 15
})

const openEntryDrawer = () => {
  entryDrawerOpened.value = true
  selectedEntry.value = getStatsEntryMock()
}
</script>
