<template>
  <InputSpinbuttonBase
    next-title="Выбрать следующий месяц"
    prev-title="Выбрать предыдущий месяц"
    :next-fn="v => dayjs(v).add(1, 'month').startOf('month')"
    :prev-fn="v => dayjs(v).subtract(1, 'month').startOf('month')"
    :display-formatter="v => capitalize(v.format('MMMM YYYY'))"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { capitalize } from 'lodash-es'

import InputSpinbuttonBase from '@/components/InputSpinbuttonBase.vue'
</script>
