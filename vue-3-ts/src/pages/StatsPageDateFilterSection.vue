<template>
  <div class="flex flex-wrap items-center lg:flex-nowrap">
    <InputDateType v-model="dateType" class="w-[446px] lg:w-[512px]" />
    <Component
      :is="selectedDateTypeInputData.inputComponent"
      v-if="selectedDateTypeInputData"
      v-model="date"
      v-bind="selectedDateTypeInputData.props"
      :class="selectedDateTypeInputData.class"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

import CalendarDatepicker from '@/components/CalendarDatepicker.vue'
import { InputDateTypeDateType } from '@/components/InputDateType.types'
import InputDateType from '@/components/InputDateType.vue'
import InputSpinbuttonMonth from '@/components/InputSpinbuttonMonth.vue'
import InputSpinbuttonYear from '@/components/InputSpinbuttonYear.vue'

const dateType = ref(InputDateTypeDateType.Day)
const date = ref(dayjs())

const dateTypeInputMap = {
  [InputDateTypeDateType.Day]: {
    inputComponent: CalendarDatepicker,
    class: 'ml-0 lg:ml-16',
    props: {
      asPopover: true,
      range: true
    }
  },
  [InputDateTypeDateType.Week]: {
    inputComponent: CalendarDatepicker,
    class: 'ml-0 lg:ml-16',
    props: {
      asPopover: true,
      range: true
    }
  },
  [InputDateTypeDateType.Month]: {
    inputComponent: InputSpinbuttonMonth,
    class: 'mt-16 lg:mt-0 lg:ml-40 w-[246px]',
    props: {}
  },
  [InputDateTypeDateType.Year]: {
    inputComponent: InputSpinbuttonYear,
    class: 'mt-16 lg:mt-0 lg:ml-40 w-[165px]',
    props: {}
  }
}

const selectedDateTypeInputData = computed(() => {
  return dateTypeInputMap[dateType.value]
})
</script>
