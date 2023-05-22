<template>
  <CircleProgress
    :key="error"
    :border-bg-width="2"
    :border-width="2"
    :transition="1000"
    :fill-color="fillColor"
    :empty-color="emptyColor"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import CircleProgress from 'vue3-circle-progress'

const ERROR_COLOR = '#FF8181'
const FILL_COLOR = '#4293F2'
const EMPTY_COLOR = 'rgba(0, 0, 0, 0.05)'

const props = defineProps({
  error: { type: Boolean, default: false }
})

const fillColor = computed(() => (props.error ? ERROR_COLOR : FILL_COLOR))
const emptyColor = computed(() => (props.error ? ERROR_COLOR : EMPTY_COLOR))
</script>
