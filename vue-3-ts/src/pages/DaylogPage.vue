<template>
  <DefaultLayout>
    <div class="flex max-h-full max-w-[1124px] flex-col">
      <CalendarWeekly v-model="selectedDate" />

      <Tabs :items="tabs" class="mt-30 w-full laptop:mt-18" />

      <div
        class="-m-15 mt-0 flex-grow overflow-y-scroll p-15 pt-0 pt-32 laptop:pt-18"
      >
        <div>
          <div class="grid grid-cols-4 gap-10">
            <InfoCard
              label="Всего:"
              :value="'30ч'"
              :inline="infoCardsInline"
              :value-first="!infoCardsInline && valueFirst"
            />
            <InfoCard
              label="В фокусе:"
              :value="'20ч 25м'"
              :inline="infoCardsInline"
              :value-first="!infoCardsInline && valueFirst"
            />
            <InfoCard
              label="Выполнено:"
              :value="'3/5'"
              :inline="infoCardsInline"
              :value-first="!infoCardsInline && valueFirst"
            />
            <InfoCard
              label="Настроение:"
              :inline="infoCardsInline"
              :value-first="!infoCardsInline && valueFirst"
            >
              <template #value>
                <div class="flex items-center justify-center">
                  <MoodIcon
                    :type="TIME_INTERVAL_MOOD.VERY_GOOD"
                    :class="{ 'ml-10': infoCardsInline }"
                    class="h-20 w-20"
                  />
                </div>
              </template>
            </InfoCard>
          </div>
        </div>

        <div class="mt-30 laptop:mt-20">
          <DaylogChronology
            :items="timeIntervalsAndHabitSections"
            :timers="timers"
            :habits="habits"
            @create-item="addItem"
            @update-item="updateItem"
            @remove-item="removeItem"
          />
        </div>
      </div>
    </div>
  </DefaultLayout>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

import { Habit } from '@/api/modules/habits/types'
import { TIME_INTERVAL_MOOD } from '@/api/modules/time-intervals/constants'
import { Timer } from '@/api/modules/timers/types'
import CalendarWeekly from '@/components/CalendarWeekly.vue'
import { DaylogItem } from '@/components/DaylogChronology.types'
import DaylogChronology from '@/components/DaylogChronology.vue'
import InfoCard from '@/components/InfoCard.vue'
import MoodIcon from '@/components/MoodIcon.vue'
import { TabItem } from '@/components/Tabs.types'
import Tabs from '@/components/Tabs.vue'
import { useWidthBreakpoints } from '@/hooks/useWidthBreakpoints'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { dateToUnixSeconds } from '@/utils/datetime'

const selectedDate = ref<Date>(new Date())
const { md } = useWidthBreakpoints()

const infoCardsInline = computed(() => md.value)
const valueFirst = computed(() => !md.value)

const tabs: TabItem[] = [
  {
    key: 'all',
    label: 'Все',
    panelComponent: 'div'
  },
  {
    key: 'study',
    label: 'Учеба',
    panelComponent: 'div'
  },
  {
    key: 'work',
    label: 'Работа',
    panelComponent: 'div'
  },
  {
    key: 'rest',
    label: 'Отдых',
    panelComponent: 'div'
  }
]

const timeIntervalsAndHabitSections = ref<DaylogItem[]>([
  {
    id: '3x4mpl30-f1d3-n71f-1c47-0r50oq4f3dc7',
    timer_id: '0bb0904a-9ec5-4877-9ca6-9cb0fa651ce0',
    habit_id: null,
    start_time: dateToUnixSeconds(dayjs().hour(2).minute(30).toDate()),
    end_time: dateToUnixSeconds(dayjs().hour(2).minute(45).toDate()),
    mood: 5,
    comment: "Слушал 'кис-кис кис-кис. ты котик, я котик.'"
  },
  {
    id: '3x4mpl30-f1d3-n71f-1c47-1231231312312',
    timer_id: null,
    habit_id: '8975f066-d0e7-4c6f-a3a7-6f8245f4096c',
    value: 2,
    date: dateToUnixSeconds(dayjs().hour(3).minute(10).toDate())
  }
])

const timers: Timer[] = [
  {
    id: '0bb0904a-9ec5-4877-9ca6-9cb0fa651ce0',
    name: 'Отжимания',
    icon: 'football',
    color: '#3BE88A',
    index: 0,
    is_notify_set: true,
    is_goal_set: false,
    notify_time: 0,
    goal_time: 0,
    parent_type_id: 0,
    parent_id: null,
    created_at: 1_169_860_416,
    updated_at: 1_634_557_712,
    deleted_at: null
  },
  {
    id: '56586d7e-15fb-4a43-b326-ee8a81d683e8',
    name: '2',
    icon: 'basketball',
    color: '#FF82A7',
    index: 1,
    is_notify_set: false,
    is_goal_set: false,
    notify_time: 0,
    goal_time: 0,
    parent_type_id: 0,
    parent_id: null,
    created_at: 1_170_044_164,
    updated_at: 1_634_557_896,
    deleted_at: null
  },
  {
    id: '9c97b2a3-62e6-41a9-967c-904a653ea8fb',
    name: '3',
    icon: 'basketball',
    color: '#FF82A7',
    index: 2,
    is_notify_set: false,
    is_goal_set: false,
    notify_time: 0,
    goal_time: 0,
    parent_type_id: 0,
    parent_id: null,
    created_at: 1_170_048_650,
    updated_at: 1_634_557_901,
    deleted_at: null
  }
]

const habits: Habit[] = [
  {
    id: '3061a002-ba86-4954-a4e0-468e78d0b639',
    name: 'Зарядка',
    icon: 'skiing',
    color: '#3BE88A',
    current_goal: 0,
    repeating: [2, 1],
    end_date: null,
    notification_time: [720, 180],
    type_id: 0,
    ending_type_id: 2,
    repeat_type_id: 0,
    created_at: 1_634_557_747,
    updated_at: 1_634_803_071,
    deleted_at: null
  },
  {
    id: '8975f066-d0e7-4c6f-a3a7-6f8245f4096c',
    name: 'Чтение',
    icon: 'basketball',
    color: '#FF82A7',
    current_goal: 1,
    repeating: [],
    end_date: '2004-11-03T18:32:11.000000Z',
    notification_time: [781, 1322],
    type_id: 1,
    ending_type_id: 0,
    repeat_type_id: 0,
    created_at: 1_634_557_730,
    updated_at: 1_637_649_607,
    deleted_at: 1_637_649_607
  }
]

const addItem = ({ item, index }) => {
  // TODO добавить запрос на апи
  timeIntervalsAndHabitSections.value.splice(index, 0, item)
}

const updateItem = ({ item, index }) => {
  // TODO добавить запрос на апи
  Object.assign(timeIntervalsAndHabitSections.value[index], item)
}

const removeItem = ({ index }) => {
  // TODO добавить запрос на апи
  timeIntervalsAndHabitSections.value.splice(index, 1)
}
</script>
