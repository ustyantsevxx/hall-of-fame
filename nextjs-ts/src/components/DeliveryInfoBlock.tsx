import clsx from 'clsx'
import { FC, ReactNode } from 'react'

type Props = {
  className?: string
  label: string
  value: ReactNode
}

export const DeliveryInfoBlock: FC<Props> = ({ className, label, value }) => {
  return (
    <div
      className={clsx(
        'rounded-18 bg-gray px-26 py-20 pr-45 md:rounded-22 md:px-30 md:pt-24',
        className
      )}
    >
      <p className="text-black/50 text-regular-15 md:text-regular-17">
        {label}
      </p>
      <p className="mt-6 text-regular-17 md:text-regular-20">{value}</p>
    </div>
  )
}
