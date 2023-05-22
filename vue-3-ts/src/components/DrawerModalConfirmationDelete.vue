<template>
  <ModalConfirmationDelete
    :ref="registerConfirmationModalSafeRef"
    :title="title"
    :description="description"
    classes="pl-[200px] mr-36 flex justify-center items-center md:pl-0 md:justify-end"
    :max-width="350"
  />
</template>

<script setup lang="ts">
import { ModalConfirmationComponent } from '@/components/ModalConfirmation.types'
import { ModalConfirmationDeleteExpose } from '@/components/ModalConfirmationDelete.types'
import ModalConfirmationDelete from '@/components/ModalConfirmationDelete.vue'
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

defineExpose<ModalConfirmationDeleteExpose>({
  show
})
</script>
