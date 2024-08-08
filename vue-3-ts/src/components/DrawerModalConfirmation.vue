<template>
  <ModalConfirmation
    :ref="registerConfirmationModalSafeRef"
    :title="title"
    :description="description"
    classes="pl-[200px] mr-36 flex justify-center items-center md:pl-0 md:justify-end"
    confirm-text="xx"
    cancel-text="xx"
    :max-width="350"
  />
</template>

<script setup lang="ts">
import {
  ModalConfirmationComponent,
  ModalConfirmationExpose
} from '@/components/ModalConfirmation.types'
import ModalConfirmation from '@/components/ModalConfirmation.vue'
import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

defineProps({
  title: { type: String, required: true },
  description: { type: String, required: true }
})

const {
  elementRef: confirmationModalRef,
  registerSafeRef: registerConfirmationModalSafeRef
} = useSafeTemplateRef<ModalConfirmationComponent>()

const show = async () => confirmationModalRef.value?.show() || false

defineExpose<ModalConfirmationExpose>({
  show
})
</script>
