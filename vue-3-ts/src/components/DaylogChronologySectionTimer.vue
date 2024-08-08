<template>
  <ColorIndicatorCard :color="item.owner?.color">
    <div class="pl-15 pr-25 laptop:pl-20">
      <div
        class="flex h-full min-h-[55px] w-full items-center laptop:min-h-[50px]"
      >
        <IconGeneric
          v-if="item.owner?.icon"
          class="h-45 w-45 laptop:h-32 laptop:w-32"
          :icon-name="item.owner.icon"
          :style="{ color: item.owner.color }"
        />

        <div
          class="ml-15 truncate text-medium-17 laptop:text-[14px] laptop:leading-[25px]"
          :title="item.owner?.name"
        >
          {{ item.owner?.name }}
        </div>

        <div
          class="ml-auto flex items-center space-x-7 text-[18px] leading-[20px] laptop:text-[14px] laptop:leading-[25px]"
        >
          <div class="hidden space-x-10 lg:flex">
            <DaylogChronologyItemBadgeMood v-if="item.mood" :type="item.mood" />
            <DaylogChronologyItemBadgeFocusCount :count="2" />
          </div>

          <div class="!ml-28 text-black/40">{{ formattedTimeRange }}</div>
          <template v-if="formattedDuration">
            <div class="text-black/40">&bull;</div>
            <div class="text-main-primary">{{ formattedDuration }}</div>
          </template>
        </div>
      </div>

      <div v-if="item.comment" class="mt-2 flex space-x-18 pb-20">
        <DaylogChronologyItemComment :color="item.owner?.color">
          {{ item.comment }}
        </DaylogChronologyItemComment>

        <div class="mt-5 flex items-start space-x-10 lg:hidden">
          <DaylogChronologyItemBadgeMood v-if="item.mood" :type="item.mood" />
          <DaylogChronologyItemBadgeFocusCount :count="2" />
        </div>
      </div>
    </div>
  </ColorIndicatorCard>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, PropType } from 'vue'

import ColorIndicatorCard from '@/components/ColorIndicatorCard.vue'
import { ChronologyTimerSection } from '@/components/DaylogChronology.types'
import DaylogChronologyItemBadgeFocusCount from '@/components/DaylogChronologySectionBadgeFocusCount.vue'
import DaylogChronologyItemBadgeMood from '@/components/DaylogChronologySectionBadgeMood.vue'
import DaylogChronologyItemComment from '@/components/DaylogChronologySectionComment.vue'
import IconGeneric from '@/components/IconGeneric.vue'
import { dateDifference } from '@/utils/datetime'

const props = defineProps({
  item: { type: Object as PropType<ChronologyTimerSection>, required: true }
})

const formatTime = datetime => dayjs(datetime).format('HH:mm')
const formattedTimeRange = computed(() => {
  const item = props.item as ChronologyTimerSection
  const startTime = formatTime(item.startDatetime)
  const endTime = formatTime(item.endDatetime)

  return startTime === endTime ? endTime : `${startTime} - ${endTime}`
})

const formattedDuration = computed(() => {
  const item = props.item as ChronologyTimerSection
  const { hours, minutes } = dateDifference(
    item.endDatetime,
    item.startDatetime
  )

  const items = [
    {
      suffix: 'xx',
      value: hours,
      visible: hours > 0
    },
    {
      suffix: 'xx',
      value: minutes,
      visible: minutes > 0
    }
  ]

  return items
    .filter(item => item.visible)
    .map(item => `${item.value} ${item.suffix}`)
    .join(' ')
})
</script>
