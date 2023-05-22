<template>
  <Drawer v-model:opened="openedPropModel">
    <template #title>
      <div class="ml-14 flex items-center">
        <span
          class="block h-16 w-16 rounded-full"
          :style="{ backgroundColor: entry.color }"
        ></span>
        <span class="ml-11">
          {{ entry.name }}
        </span>
      </div>
    </template>

    <div class="mt-13">
      <InputDateType v-model="drawerDateType" disable-day disable-year />
      <InputSpinbuttonWeek
        v-if="drawerDateType === InputDateTypeDateType.Week"
        v-model="week"
        class="mt-17 laptop:mt-12"
      />
      <InputSpinbuttonMonth
        v-if="drawerDateType === InputDateTypeDateType.Month"
        v-model="month"
        class="mt-17 laptop:mt-12"
      />
    </div>

    <div class="mt-30 laptop:mt-22">
      <p class="text-17 laptop:text-14">Общая статистика таймера</p>

      <div class="mt-15 grid grid-cols-2 gap-10">
        <InfoCard
          label="Всего"
          value="50 м"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-60"
        />
        <InfoCard
          label="Настроение"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-60"
        >
          <template #value>
            <MoodIcon :type="entry.mood" class="h-22 w-22" />
          </template>
        </InfoCard>
        <InfoCard
          label="В среднем"
          value="50 м"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-60"
        />
        <InfoCard
          label="Ежедневная цель"
          value="50 м"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-60"
        />
        <InfoCard
          label="Разница с целью"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-60"
        >
          <template #value>
            <span class="text-subcolor-green-done">20 м (5%)</span>
          </template>
        </InfoCard>
      </div>
    </div>

    <div class="mt-30 laptop:mt-20">
      <p class="text-17 laptop:text-14">Интервалы времени</p>

      <div class="mt-15 grid grid-cols-4 gap-10">
        <InfoCard
          label="Кол-во"
          value="1"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-65"
        />
        <InfoCard
          label="Средний"
          value="50 м"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-65"
        />
        <InfoCard
          label="Мин"
          value="0"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-65"
        />
        <InfoCard
          label="Макс"
          value="50 м"
          class="laptop:h-50 xl:flex-nowrap xl:bg-white 2xl:h-65"
        />
      </div>
    </div>
  </Drawer>
</template>

<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import dayjs from 'dayjs'
import { ref } from 'vue'

import Drawer from '@/components/Drawer.vue'
import InfoCard from '@/components/InfoCard.vue'
import { InputDateTypeDateType } from '@/components/InputDateType.types'
import InputDateType from '@/components/InputDateType.vue'
import InputSpinbuttonMonth from '@/components/InputSpinbuttonMonth.vue'
import InputSpinbuttonWeek from '@/components/InputSpinbuttonWeek.vue'
import MoodIcon from '@/components/MoodIcon.vue'

const props = defineProps<{
  // TODO: type
  entry?: any
  opened: boolean
}>()

const emit = defineEmits<{
  (e: 'update:opened', v: boolean)
}>()

const openedPropModel = useVModel(props, 'opened', emit)

const drawerDateType = ref(InputDateTypeDateType.Week)
const week = ref(dayjs())
const month = ref(dayjs())
</script>
