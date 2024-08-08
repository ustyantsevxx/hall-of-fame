<template>
  <InputSpinbuttonBase
    next-title="xx xx xx"
    prev-title="xx xx xx"
    :next-fn="v => dayjs(v).add(1, 'year').startOf('year')"
    :prev-fn="v => dayjs(v).subtract(1, 'year').startOf('year')"
    :display-formatter="v => v.year().toString()"
  />
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

import InputSpinbuttonBase from '@/components/InputSpinbuttonBase.vue'
</script>
