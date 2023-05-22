import { ref } from 'vue'

export const useSafeTemplateRef = <T = any>() => {
  const elementRef = ref<T>()

  const registerSafeRef = (el: any) => {
    if (el) {
      elementRef.value = el
    }
  }

  return {
    registerSafeRef,
    elementRef
  }
}
