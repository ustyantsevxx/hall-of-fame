import { ComponentPublicInstance } from 'vue'

export type ModalConfirmationExpose = {
  show: () => Promise<boolean>
}

export type ModalConfirmationComponent = ComponentPublicInstance &
  ModalConfirmationExpose

export type ModalConfirmationActionsSlotContent = {
  confirm: () => void
  cancel: () => void
}
