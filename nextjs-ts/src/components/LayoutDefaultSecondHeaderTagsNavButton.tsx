import clsx from 'clsx'
import React, { ButtonHTMLAttributes, forwardRef } from 'react'

import ArrowTabsRightSvg from '../assets/svg/ArrowTabsRight.svg'

type Props = ButtonHTMLAttributes<HTMLButtonElement>

export const LayoutDefaultSecondHeaderTagsNavButton = forwardRef<
  HTMLButtonElement,
  Props
>(({ className, ...attrs }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        'group absolute top-1/2 z-10 hidden h-full w-[76px] -translate-y-1/2 select-none items-center lg:flex',
        className
      )}
      {...attrs}
    >
      <span
        className="block h-full w-30"
        style={{
          background:
            'linear-gradient(266.12deg, #FFFFFF 23.16%, rgba(255, 255, 255, 0) 97.58%)'
        }}
      ></span>

      <span className="flex h-full flex-grow items-center justify-end bg-white">
        <div className="flex h-36 w-36 items-center justify-center rounded-full bg-pink transition group-hover:bg-pink-hover group-hover:text-white ">
          <ArrowTabsRightSvg />
        </div>
      </span>
    </button>
  )
})

LayoutDefaultSecondHeaderTagsNavButton.displayName =
  'LayoutDefaultSecondHeaderTagsNavButton'
