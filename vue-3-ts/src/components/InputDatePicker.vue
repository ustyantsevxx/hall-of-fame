<template>
  <div>
    <button
      :title="label"
      class="mt-15 flex w-full items-center border-b border-black/10 text-left text-19"
      type="button"
      @click="showModal"
    >
      <span v-if="dateSelected" class="grow">{{ displayedDate }}</span>
      <span v-else class="grow">{{ placeholder }}</span>
      <SvgChevron class="h-24 w-24 text-main-placeholder" />
    </button>

    <ModalDatePicker
      v-model:visible="modalVisible"
      :model-value="modelValue"
      :attach="modalAttach"
      :label="label"
      mandatory
      @update:model-value="value => emit('update:modelValue', value)"
    />
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

import ModalDatePicker from '@/components/ModalDatePicker.vue'

const props = defineProps({
  modelValue: { type: Date, default: undefined },
  label: { type: String, required: true },
  placeholder: { type: String, default: 'Выберите дату' },
  displayFormat: { type: String, default: 'DD MMMM YYYY' },
  modalAttach: { type: String, default: undefined }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date)
}>()

const modalVisible = ref(false)

const dateSelected = computed(() => {
  return !!props.modelValue
})

const displayedDate = computed(() => {
  return dateSelected.value
    ? dayjs(props.modelValue).format(props.displayFormat)
    : ''
})

const showModal = () => {
  modalVisible.value = true
}
</script>
