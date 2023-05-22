<template>
  <FormItemList
    :items="COLORS"
    :per-row="5"
    :model-value="modelValue"
    list-class="space-x-3"
    @update:model-value="value => emitVModel(value)"
  >
    <template #item="{ selected, item: color, select }">
      <button
        class="flex h-55 w-55 items-center justify-center rounded-14 p-7 transition-colors laptop:h-48 laptop:w-48"
        :class="{
          'bg-main-primary/10': selected
        }"
        type="button"
        @click="select(color)"
      >
        <figure
          class="h-35 w-35 rounded-full transition-colors laptop:h-30 laptop:w-30"
          :style="{
            backgroundColor: color
          }"
        ></figure>
      </button>
    </template>
  </FormItemList>
</template>

<script setup lang="ts">
import { COLORS } from '@/api/shared/constants'
import FormItemList from '@/components/FormItemList.vue'

defineProps({
  modelValue: { type: String, default: '' }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: string)
}>()

const emitVModel = (value: string) => {
  emit('update:modelValue', value)
}
</script>
