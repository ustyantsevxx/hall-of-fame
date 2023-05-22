import clsx from 'clsx'
import { forwardRef, TextareaHTMLAttributes } from 'react'

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  invalid?: boolean
}

export const AppTextarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ children, className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={clsx(
          'rounded-12 border border-black/10 px-18 pt-14 pb-12 placeholder-black/25 outline-none transition text-regular-17 focus:border-transparent focus:bg-gray disabled:bg-transparent disabled:opacity-50',
          className,
          { '!bg-pink': invalid }
        )}
        {...props}
      >
        {children}
      </textarea>
    )
  }
)

AppTextarea.displayName = 'AppTextarea'
