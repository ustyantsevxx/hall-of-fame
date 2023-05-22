<template>
  <Modal v-model="opened" :classes="classes" @closed="handleClose">
    <div class="py-15 px-20">
      <h3 class="!font-sans text-medium-17">
        {{ title }}
      </h3>

      <div class="mt-5">
        <p class="!font-sans text-15">
          {{ description }}
        </p>
      </div>

      <slot name="actions" :confirm="handleConfirm" :cancel="handleCancel">
        <div class="mt-15 flex space-x-5">
          <button
            class="px-15 py-10 text-main-primary transition-colors hover:text-black"
            type="button"
            @click="handleConfirm"
          >
            {{ confirmText }}
          </button>

          <button
            class="px-15 py-10 text-subcolor-orange-cancel transition-colors hover:text-black"
            type="button"
            @click="handleCancel"
          >
            {{ cancelText }}
          </button>
        </div>
      </slot>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import Modal from '@/components/Modal.vue'
import { ModalConfirmationExpose } from '@/components/ModalConfirmation.types'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true },
  confirmText: { type: String, default: undefined },
  cancelText: { type: String, default: undefined },
  classes: { type: String, default: undefined }
})

defineEmits<{
  (e: 'confirm', closeFn: () => void)
  (e: 'cancel', closeFn: () => void)
  (e: 'closed')
}>()

const opened = ref(false)

const show = async () => {
  opened.value = true
  return await new Promise<boolean>(resolve => {
    confirm.value = () => {
      resolve(true)
    }
    cancel.value = () => {
      resolve(false)
    }
  })
}
const confirm = ref<(() => void) | null>(null)
const cancel = ref<(() => void) | null>(null)

const handleConfirm = () => {
  confirm.value?.()
  opened.value = false
}

const handleCancel = () => {
  cancel.value?.()
  opened.value = false
}

const handleClose = () => {
  cancel.value?.()
  opened.value = false
}

defineExpose<ModalConfirmationExpose>({
  show
})
</script>
