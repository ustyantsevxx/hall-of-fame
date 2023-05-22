<template>
  <PopoverApp @opened="reset">
    <template #button="{ open }">
      <span
        class="-ml-4 flex items-center whitespace-nowrap rounded-6 pl-4 transition-colors text-medium-23 hover:bg-black/5 active:bg-black/10 laptop:!text-[16px] laptop:!leading-[30px]"
        :class="{ 'bg-black/5': open }"
      >
        <span class="capitalize">{{ displayedMonthName }}</span>
        <span>, {{ year }}</span>
        <SvgChevron
          class="ml-3 min-h-[24px] min-w-[24px] text-main-placeholder transition-transform"
          :class="{ 'rotate-180': open }"
        />
      </span>
    </template>

    <template #default="{ close }">
      <div
        style="box-shadow: 0 0 15px rgba(0, 0, 0, 0.1)"
        class="mt-5 w-full w-[236px] rounded-13 bg-white p-12 pb-8"
      >
        <CalendarWeeklyPopoverItemInputMonth
          v-if="mode === SelectMode.Month"
          :model-value="displayedMonth"
          :selected-year="year"
          :displayed-year="displayedYear"
          @update:modelValue="value => selectMonth(value, close)"
          @toggle="mode = SelectMode.Year"
          @previous="displayedYear--"
          @next="displayedYear++"
        />
        <CalendarWeeklyPopoverItemInputYear
          v-else-if="mode === SelectMode.Year"
          :model-value="displayedYear"
          @update:modelValue="selectYear"
          @toggle="mode = SelectMode.Month"
        />
      </div>
    </template>
  </PopoverApp>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'

import { ICalendarWeeklyPopoverItem } from '@/components/CalendarWeekly.types'
import CalendarWeeklyPopoverItemInputMonth from '@/components/CalendarWeeklyPopoverItemInputMonth.vue'
import CalendarWeeklyPopoverItemInputYear from '@/components/CalendarWeeklyPopoverItemInputYear.vue'
import PopoverApp from '@/components/PopoverApp.vue'

enum SelectMode {
  Month,
  Year
}

const props = defineProps({
  month: { type: Number, default: null },
  year: { type: Number, default: null }
})
const emit = defineEmits<{
  (e: 'update:month', v: number)
  (e: 'update:year', v: number)
}>()

const mode = ref<SelectMode>(SelectMode.Month)

const displayedMonth = ref(0)
const displayedYear = ref(0)

const displayedMonthName = computed(() => {
  return dayjs.months()[props.month]
})

watch(
  () => props.month,
  value => {
    displayedMonth.value = value
  }
)
watch(
  () => props.year,
  value => {
    displayedYear.value = value
  }
)

const selectYear = (selectedYear: ICalendarWeeklyPopoverItem) => {
  displayedYear.value = selectedYear.value
  displayedMonth.value = -1
  mode.value = SelectMode.Month
}

const selectMonth = (
  selectedMonth: ICalendarWeeklyPopoverItem,
  closeCallback: () => void
) => {
  emit('update:year', displayedYear.value)
  emit('update:month', selectedMonth.value)

  closeCallback()
}

const reset = () => {
  mode.value = SelectMode.Month
  displayedMonth.value = props.month
  displayedYear.value = props.year
}
</script>
