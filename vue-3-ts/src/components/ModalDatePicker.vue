<template>
  <Modal
    :model-value="visible"
    focus-trap
    content-class="rounded-15 overflow-hidden w-[355px] bg-white flex justify-center p-15"
    @update:model-value="updateVisible"
  >
    <CalendarDatepicker v-model="selectedDate" @update:modelValue="submit" />
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import CalendarDatepicker from '@/components/CalendarDatepicker.vue'
import Modal from '@/components/Modal.vue'

const props = defineProps({
  modelValue: { type: Date, default: new Date() },
  visible: { type: Boolean, default: false }
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: Date)
  (e: 'update:visible', v: boolean)
}>()

const selectedDate = ref(new Date(props.modelValue))

const updateVisible = (value: boolean) => {
  emit('update:visible', value)
}
const submit = () => {
  emit('update:modelValue', selectedDate.value)
  updateVisible(false)
}
</script>

<style>
.vc-day-content,
.vc-title {
  @apply !font-normal;
}

.vc-title {
  @apply capitalize;
}

.vc-nav-popover-container {
  @apply border-0 bg-main-primary;
}

.vc-nav-title.vc-grid-focus,
.vc-nav-arrow,
.vc-nav-item {
  @apply hover:bg-main-primary hover:shadow-none focus:border-transparent;
}

.vc-nav-item.is-active {
  @apply bg-white text-main-primary shadow-none;
}
</style>
