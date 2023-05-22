import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

import styles from './AppButton.module.css'
import { ButtonSize, ButtonVariant } from './AppButton.types'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
}

export const AppButton: FC<Props> = ({
  variant = 'primary',
  size = 'normal',
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(styles[variant], styles[size], className)}
      {...props}
    >
      {children}
    </button>
  )
}
