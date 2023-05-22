import { Ref, ref } from 'vue'

export const useBoolean = (
  initialValue = false
): [
  Ref<boolean>,
  {
    // eslint-disable-next-line no-unused-vars
    set: (value: boolean) => void
    setTrue: () => void
    setFalse: () => void
    toggle: () => void
  }
] => {
  const r = ref(initialValue)
  return [
    r,
    {
      set: (value: boolean) => (r.value = value),
      setFalse: () => (r.value = false),
      setTrue: () => (r.value = true),
      toggle: () => (r.value = !r.value)
    }
  ]
}
