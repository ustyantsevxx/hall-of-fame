<template>
  <div>
    <ul>
      <li
        v-for="entry in entries"
        :key="entry.id"
        role="button"
        tabindex="0"
        class="mt-5 select-none"
        @keypress.prevent.enter.space="emitSelectEntry(entry.id)"
        @click="emitSelectEntry(entry.id)"
      >
        <StatsCardEntryListEntry :entry="entry" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import StatsCardEntryListEntry from '@/components/StatsCardEntryListEntry.vue'

defineProps({
  // TODO type
  entries: { type: Array as PropType<any[]>, default: () => [] }
})

const emit = defineEmits<{
  // TODO type
  (e: 'select-entry', v: any)
}>()

// TODO type
const emitSelectEntry = (entryId: any) => {
  emit('select-entry', entryId)
}
</script>
