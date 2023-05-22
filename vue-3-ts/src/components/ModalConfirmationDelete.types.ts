import { ModalConfirmationComponent } from '@/components/ModalConfirmation.types'

export type ModalConfirmationDeleteExpose = {
  show: () => Promise<boolean>
}

export type ModalConfirmationDeleteComponent = ModalConfirmationComponent
