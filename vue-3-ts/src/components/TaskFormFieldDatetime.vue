<template>
  <div>
    <FieldValueViewer
      :label="label"
      :value="displayedDate"
      @edit="modalVisible = true"
      @reset="emit('update:modelValue', null)"
    >
      <template #icon>
        <slot name="icon"></slot>
      </template>
    </FieldValueViewer>

    <TaskFormModalDatePicker
      v-model:visible="modalVisible"
      :model-value="modelValue"
      :initial-value="modalInitialValue"
      :title="modalTitle"
      @update:modelValue="value => emit('update:modelValue', value)"
    >
      <template #icon>
        <slot name="icon"></slot>
      </template>

      <template #after-title="slotData">
        <slot name="modal-after-title" v-bind="slotData"></slot>
      </template>

      <template #after-fields="slotData">
        <slot name="modal-after-fields" v-bind="slotData"></slot>
      </template>
    </TaskFormModalDatePicker>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, ref } from 'vue'

import FieldValueViewer from '@/components/FieldValueViewer.vue'
import TaskFormModalDatePicker from '@/components/TaskFormModalDatePicker.vue'

const props = defineProps({
  modelValue: { type: Date, default: null },
  label: { type: String, required: true },
  modalTitle: { type: String, required: true },
  modalInitialValue: { type: Date, default: null },
  modalAttach: { type: String, default: undefined }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date | null)
}>()

const modalVisible = ref(false)

const dateSelected = computed(() => {
  return !!props.modelValue
})

const displayedDate = computed(() => {
  return dateSelected.value
    ? dayjs(props.modelValue).calendar(null, {
        sameDay: '[сегодня в] HH:mm',
        nextDay: '[завтра в] HH:mm',
        nextWeek: 'DD.MM.YYYY в HH:mm',
        lastDay: '[вчера в] HH:mm',
        lastWeek: 'DD.MM.YYYY в HH:mm',
        sameElse: 'DD.MM.YYYY в HH:mm'
      })
    : ''
})
</script>
