<template>
  <InlineSvg :key="path" :src="path" />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import InlineSvg from 'vue-inline-svg'

const props = defineProps({
  iconName: { type: String, required: true }
})

const getIconPath = (name: string) => `/Icons/${name}.svg`
const path = computed(() => getIconPath(props.iconName))
</script>
