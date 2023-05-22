import { forwardRef, InputHTMLAttributes } from 'react'

import { InputMasked } from './InputMasked'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
  onAccept?: (value: string) => void
}

export const InputPhoneNumber = forwardRef<HTMLInputElement, Props>(
  ({ onAccept, value: _, ...props }, ref) => {
    return (
      <InputMasked
        type="tel"
        mask="+7 (000) 000-00-00"
        placeholderChar="_"
        lazy={false}
        onAccept={(_, { unmaskedValue }) => onAccept?.(`+7${unmaskedValue}`)}
        inputRef={(el: any) => {
          if (ref && el) {
            ;(ref as any).current = el
          }
        }}
        {...props}
      />
    )
  }
)

InputPhoneNumber.displayName = 'AppInput'
