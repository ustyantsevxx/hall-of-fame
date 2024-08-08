<template>
  <div>
    <div class="flex">
      <span class="text-medium-15">xx xx:</span>
      <span class="ml-6 text-main-primary text-15">
        <span>{{ title }}</span>
      </span>
    </div>

    <div v-if="hasEndDate" class="mt-6 flex justify-between text-15">
      <span>{{ formattedStartDate }}</span>
      <span>{{ formattedEndDate }}</span>
    </div>

    <div v-if="hasEndDate" class="mt-12">
      <ProgressBar
        class="h-7"
        type="line"
        stroke-color="rgba(66, 147, 242, 1)"
        trail-color="rgba(66, 147, 242, 0.3)"
        :percent="progressInPercent"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed } from 'vue'

import ProgressBar from '@/components/ProgressBar.vue'

const props = defineProps({
  startDate: { type: Date, required: true },
  endDate: { type: Date, default: undefined }
})

const formatDate = (date: Date) => dayjs(date).format('DD MMMM YYYY')
const formattedStartDate = computed(() => formatDate(props.startDate))
const formattedEndDate = computed(() =>
  formatDate(props.endDate || props.startDate)
)

const daysTotal = computed(() => {
  const daysTotal = dayjs(props.endDate).diff(props.startDate, 'days')
  return daysTotal > 0 ? daysTotal : 1
})
const daysGone = computed(() => {
  const daysGone = dayjs().diff(props.startDate, 'days')
  return daysGone > daysTotal.value ? daysTotal.value : daysGone
})

const progressInPercent = computed(
  () => (daysGone.value / daysTotal.value) * 100
)

const hasEndDate = computed(() => {
  return !!props.endDate
})

const title = computed(() => {
  return hasEndDate.value
    ? `${daysGone.value} xx ${daysTotal.value}`
    : daysGone.value
})
</script>
