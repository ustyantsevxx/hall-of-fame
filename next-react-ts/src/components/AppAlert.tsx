import clsx from 'clsx'
import { FC } from 'react'

import styles from './AppAlert.module.css'
import { AlertVariant } from './AppAlert.types'

type Props = {
  title?: string
  text?: string
  className?: string
  variant: AlertVariant
}

export const AppAlert: FC<Props> = ({ className, text, title, variant }) => {
  return (
    <div
      className={clsx(
        'flex flex-col space-y-4 rounded-14 py-12 px-16 md:space-y-6 md:rounded-18 md:px-30 md:py-24',
        styles[variant],
        className
      )}
    >
      {title && (
        <p className="alert-title text-regular-15 md:text-regular-20">
          {title}
        </p>
      )}

      {text && (
        <p className="alert-text text-black/50 text-regular-15">{text}</p>
      )}
    </div>
  )
}
