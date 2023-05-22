<template>
  <RadioGroupInput
    v-bind="$attrs"
    :items="dateTypeOptions"
    :variant="'button-group-shadow'"
  />
</template>

<script setup lang="ts">
import { compact } from 'lodash-es'

import { InputDateTypeDateType } from '@/components/InputDateType.types'
import { RadioGroupInputItem } from '@/components/RadioGroup.types'
import RadioGroupInput from '@/components/RadioGroupInput.vue'

const props = defineProps({
  disableDay: { type: Boolean, default: false },
  disableMonth: { type: Boolean, default: false },
  disableWeek: { type: Boolean, default: false },
  disableYear: { type: Boolean, default: false }
})

const dateTypeOptions: RadioGroupInputItem[] = compact([
  !props.disableDay && {
    label: 'День',
    value: InputDateTypeDateType.Day
  },
  !props.disableWeek && {
    label: 'Неделя',
    value: InputDateTypeDateType.Week
  },
  !props.disableMonth && {
    label: 'Месяц',
    value: InputDateTypeDateType.Month
  },
  !props.disableYear && {
    label: 'Год',
    value: InputDateTypeDateType.Year
  }
])
</script>
