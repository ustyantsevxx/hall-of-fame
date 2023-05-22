import clsx from 'clsx'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const StoriesSliderNavButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, ...attrs }, ref) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'absolute top-1/2 z-10 hidden h-[49px] w-[49px] -translate-y-1/2 items-center justify-center rounded-full bg-white transition-colors hover:bg-pink hover:text-white hover:shadow-transparent xl:flex',
          className
        )}
        style={{ boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }}
        {...attrs}
      >
        {children}
      </button>
    )
  }
)

StoriesSliderNavButton.displayName = 'StoriesSliderNavButton'
