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

        <!--        <div-->
        <!--          class="ml-auto flex items-center space-x-7 text-[18px] leading-[20px]"-->
        <!--        >-->
        <!--          <div class="space-x-10 flex">-->
        <!--            <DaylogChronologyItemBadgeMood v-if="item.mood" :type="item.mood" />-->

        <!--            <DaylogChronologyItemBadgeFocusCount :count="2" />-->
        <!--          </div>-->

        <!--          <div class="!ml-28 text-black/40">09:00 - 17:12</div>-->
        <!--          <div class="text-black/40">&bull;</div>-->
        <!--          <div class="text-main-primary">8 ч 12 мин</div>-->
        <!--        </div>-->
        <!--      </div>-->

        <!--      <div v-if="item.comment" class="mt-2 pb-20">-->
        <!--        <DaylogChronologyItemComment :color="item.color">-->
        <!--          {{ item.comment }}-->
        <!--        </DaylogChronologyItemComment>-->
      </div>
    </div>
  </ColorIndicatorCard>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import ColorIndicatorCard from '@/components/ColorIndicatorCard.vue'
import { ChronologyHabitSection } from '@/components/DaylogChronology.types'
// import DaylogChronologyItemBadgeFocusCount from '@/components/DaylogChronologySectionBadgeFocusCount.vue'
// import DaylogChronologyItemBadgeMood from '@/components/DaylogChronologySectionBadgeMood.vue'
// import DaylogChronologyItemComment from '@/components/DaylogChronologySectionComment.vue'
import IconGeneric from '@/components/IconGeneric.vue'

defineProps({
  item: { type: Object as PropType<ChronologyHabitSection>, required: true }
})
</script>
