<template>
  <FormItemList
    :items="ICONS"
    :per-row="5"
    list-class="space-x-3"
    :model-value="modelValue"
    @update:model-value="value => emitVModel(value)"
  >
    <template #item="{ selected, item: icon, select }">
      <button
        class="flex h-55 w-55 items-center justify-center rounded-14 transition-colors laptop:h-48 laptop:w-48"
        :class="{ 'bg-main-primary/10': selected }"
        type="button"
        @click="select(icon)"
      >
        <IconGeneric
          :icon-name="icon"
          class="text-main-primary laptop:h-40 laptop:w-40"
        />
      </button>
    </template>
  </FormItemList>
</template>

<script setup lang="ts">
import { ICONS } from '@/api/shared/constants'
import FormItemList from '@/components/FormItemList.vue'
import IconGeneric from '@/components/IconGeneric.vue'

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
