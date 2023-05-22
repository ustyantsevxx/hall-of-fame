<template>
  <InputSpinbuttonBase
    next-title="Выбрать следующую неделю"
    prev-title="Выбрать предыдущую неделю"
    :next-fn="v => dayjs(v).add(1, 'week').startOf('week')"
    :prev-fn="v => dayjs(v).subtract(1, 'week').startOf('week')"
    :display-formatter="formatWeekRange"
  />
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs'

import InputSpinbuttonBase from '@/components/InputSpinbuttonBase.vue'

const formatWeekRange = (value: Dayjs) => {
  const startOfWeek = value.startOf('week').format('DD.MM.YYYY')
  const endOfWeek = value.endOf('week').format('DD.MM.YYYY')
  return `${startOfWeek} — ${endOfWeek}`
}
</script>
