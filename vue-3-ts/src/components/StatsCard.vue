<template>
  <div
    class="relative h-[max-content] w-[462px] rounded-8 border border-black/5 bg-white py-25 px-15 laptop:px-25 xl:w-[495px] 2xl:w-[512px] 2xl:pl-40"
    style="box-shadow: 0px 0px 10px 4px rgba(0, 0, 0, 0.05)"
  >
    <ButtonHeadless
      class="absolute right-8 top-15 p-5 xl:right-20"
      title="Сохранить статистику"
    >
      <SvgShare />
    </ButtonHeadless>

    <h2 class="text-center text-17 laptop:text-14">
      {{ item.date }}
    </h2>

    <div class="mt-20 flex">
      <div class="grid grid-cols-[94px,96px] grid-rows-[80px,80px] gap-10">
        <InfoCard label="Всего" :value="item.tags.total" />
        <InfoCard label="Интервалы" :value="item.tags.intervalCount" />
        <InfoCard label="В фокусе" :value="item.tags.focus" />
        <InfoCard label="Настроение">
          <template #value>
            <div class="rounded-full bg-white p-2">
              <MoodIcon :type="item.tags.mood" class="h-28 w-28" />
            </div>
          </template>
        </InfoCard>
      </div>

      <div class="flex w-full items-center justify-end">
        <StatsCardChart class="h-[190px] w-full" :chart-data="chartData" />
      </div>
    </div>

    <StatsCardEntryList
      v-if="item.entries?.length > 0"
      :entries="item.entries"
      class="mt-20 laptop:mt-12"
      @select-entry="emitSelectEntry"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import ButtonHeadless from '@/components/ButtonHeadless.vue'
import InfoCard from '@/components/InfoCard.vue'
import MoodIcon from '@/components/MoodIcon.vue'
import StatsCardChart from '@/components/StatsCardChart.vue'
import StatsCardEntryList from '@/components/StatsCardEntryList.vue'

const props = defineProps({
  // TODO type
  item: { type: Object, required: true }
})

const emit = defineEmits<{
  // TODO type
  (e: 'select-entry', v: any)
}>()

// TODO type
const emitSelectEntry = (entryId: any) => {
  emit('select-entry', entryId)
}

const chartData = computed(() => {
  return props.item.entries
})
</script>
