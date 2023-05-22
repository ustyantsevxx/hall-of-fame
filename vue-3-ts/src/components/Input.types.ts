import { ComponentPublicInstance } from 'vue'

export type InputVariant = 'regular' | 'primary' | 'outline' | 'bottom-line'

export type InputExpose = {
  focus: () => void
  blur: () => void
}

export type InputComponent = ComponentPublicInstance & InputExpose
