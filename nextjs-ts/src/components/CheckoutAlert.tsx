import clsx from 'clsx'
import { FC } from 'react'

import styles from './AppAlert.module.css'
import { AlertVariant } from './AppAlert.types'

type Props = {
  text?: string
  className?: string
  variant: AlertVariant
}

export const CheckoutAlert: FC<Props> = ({ className, text, variant }) => {
  return (
    <div
      className={clsx(
        'rounded-14 py-14 px-20 md:space-y-6 md:rounded-18',
        styles[variant],
        className
      )}
    >
      {text && <p className="text-regular-15">{text}</p>}
    </div>
  )
}
