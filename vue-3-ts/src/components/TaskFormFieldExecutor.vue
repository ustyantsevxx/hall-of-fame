<template>
  <div>
    <FieldValueViewer
      label="Исполнитель"
      @edit="modalVisible = true"
      @reset="emit('update:modelValue', null)"
    >
      <template #icon>
        <SvgPerson />
      </template>
    </FieldValueViewer>

    <TaskFormModalExecutorPicker
      v-model:visible="modalVisible"
      :attach="modalAttach"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import FieldValueViewer from '@/components/FieldValueViewer.vue'
import TaskFormModalExecutorPicker from '@/components/TaskFormModalExecutorPicker.vue'

defineProps({
  modelValue: { type: Date, default: null },
  modalAttach: { type: String, default: undefined }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date | null)
}>()

const modalVisible = ref(false)
</script>
