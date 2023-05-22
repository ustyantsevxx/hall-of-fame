import { onBeforeUpdate } from 'vue'

import { useSafeTemplateRef } from '@/hooks/useSafeTemplateRef'

export const useSafeDynamicTemplateRef = <T = any>() => {
  const { elementRef, registerSafeRef } = useSafeTemplateRef<T>()

  onBeforeUpdate(() => {
    elementRef.value = undefined
  })

  return {
    registerSafeRef,
    elementRef
  }
}
