import { ComponentPublicInstance } from 'vue'

export type TaskQuickSearchInputExpose = {
  focusInput: () => void
  blurInput: () => void
}

export type TaskQuickSearchInputComponent = ComponentPublicInstance &
  TaskQuickSearchInputExpose
