<template>
  <ColorIndicatorCard :color="timer.color">
    <div class="flex max-w-full items-center py-10 pl-10 pr-14">
      <IconGeneric
        :icon-name="timer.icon"
        :style="{ color: timer.color }"
        class="max-h-[40px] max-w-[40px]"
      />

      <div class="ml-10">
        <div
          :title="timer.name"
          class="truncate text-[13px] font-medium leading-[15px]"
        >
          {{ timer.name }}
        </div>
      </div>
    </div>
  </ColorIndicatorCard>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Timer } from '@/api/modules/timers/types'
import ColorIndicatorCard from '@/components/ColorIndicatorCard.vue'
import IconGeneric from '@/components/IconGeneric.vue'

defineProps({
  timer: { type: Object as PropType<Timer>, required: true }
})
</script>
