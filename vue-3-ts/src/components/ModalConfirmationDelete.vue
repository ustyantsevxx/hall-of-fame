<template>
  <ModalConfirmation
    :ref="registerConfirmationModalSafeRef"
    :title="title"
    :description="description"
    :classes="classes"
    :cancel-text="cancelText"
    :confirm-text="confirmText"
  >
    <template
      #actions="{ confirm, cancel }: ModalConfirmationActionsSlotContent"
    >
      <div class="mt-15 flex space-x-5">
        <button
          class="rounded-10 border border-subcolor-orange-cancel px-15 py-10 text-subcolor-orange-cancel transition-colors hover:bg-subcolor-orange-cancel hover:text-white"
          type="button"
          @click="confirm"
        >
          Удалить
        </button>

        <button
          class="px-15 py-10 text-main-primary transition-colors hover:text-black"
          type="button"
          @click="cancel"
        >
          Отмена
        </button>
      </div>
    </template>
  </ModalConfirmation>
</template>

<script setup lang="ts">
import type {
  ModalConfirmationActionsSlotContent,
  ModalConfirmationComponent
} from '@/components/ModalConfirmation.types'
import ModalConfirmation from '@/components/ModalConfirmation.vue'
import { ModalConfirmationDeleteExpose } from '@/components/ModalConfirmationDelete.types'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

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

const {
  elementRef: confirmationModalRef,
  registerSafeRef: registerConfirmationModalSafeRef
} = useSafeTemplateRef<ModalConfirmationComponent>()

const show = async () => confirmationModalRef.value?.show() || false

defineExpose<ModalConfirmationDeleteExpose>({
  show
})
</script>
