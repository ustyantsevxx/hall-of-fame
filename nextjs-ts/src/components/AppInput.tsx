import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'

export type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean
}

export const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'h-50 rounded-12 border border-black/10 px-18 pt-14 pb-12 placeholder-black/25 outline-none transition text-regular-17 focus:border-transparent focus:bg-gray disabled:bg-transparent disabled:opacity-50',
          className,
          { '!bg-pink': invalid }
        )}
        {...props}
      />
    )
  }
)

AppInput.displayName = 'AppInput'
