<template>
  <div class="flex items-center justify-between">
    <ButtonCircleArrow :title="prevTitle" @click="emitPrev" />
    <p class="text-center text-[17px] leading-[18px] laptop:text-14">
      {{ displayedValue }}
    </p>
    <ButtonCircleArrow right :title="nextTitle" @click="emitNext" />
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import ButtonCircleArrow from '@/components/ButtonCircleArrow.vue'

const props = defineProps({
  modelValue: { type: Object as PropType<unknown>, default: undefined },
  displayFormatter: { type: Function, default: (v: unknown) => v },
  nextTitle: { type: String, default: 'xx xx.' },
  prevTitle: { type: String, default: 'xx xx.' },
  nextFn: { type: Function, required: true },
  prevFn: { type: Function, required: true }
})

const emit = defineEmits<{ (e: 'update:modelValue', v: unknown) }>()
const displayedValue = computed(() => props.displayFormatter(props.modelValue))
const emitPrev = () => emit('update:modelValue', props.prevFn(props.modelValue))
const emitNext = () => emit('update:modelValue', props.nextFn(props.modelValue))
</script>
