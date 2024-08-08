import clsx from 'clsx'
import { FC } from 'react'

type Props = {
  className?: string
}

export const HistoryOrderItemStatusHeaderReadyToPickup: FC<Props> = ({
  className
}) => {
  return (
    <div
      className={clsx(
        'px-18 pt-16 pb-4 text-regular-15 md:flex md:px-40 md:pt-25',
        className
      )}
    >
      <div className="whitespace-nowrap">xx xx xx</div>
    </div>
  )
}
