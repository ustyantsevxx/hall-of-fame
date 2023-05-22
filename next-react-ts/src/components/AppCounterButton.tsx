import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

import styles from './AppCounterButton.module.css'

type Size = 'normal' | 'mini'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  size: Size
}

export const AppCounterButton: FC<Props> = ({
  children,
  size,
  className,
  ...attrs
}) => {
  return (
    <button
      className={clsx(
        'flex items-center justify-center rounded-full border border-pink text-black transition-colors active:bg-pink disabled:border-black/10 disabled:bg-transparent disabled:text-black/10 lg:hover:bg-pink',
        styles[size],
        className
      )}
      {...attrs}
    >
      {children}
    </button>
  )
}
