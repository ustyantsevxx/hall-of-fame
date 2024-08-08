import clsx from 'clsx'
import { FC } from 'react'

import { Order } from '../api/modules/orders/orders.types'
import { rawTimeToCalendarString } from '../utils/date'

type Props = {
  className?: string
  order: Order
}

export const HistoryOrderItemStatusHeaderCanceled: FC<Props> = ({
  className,
  order
}) => {
  // TODO xx xx xx xx
  const dateString = rawTimeToCalendarString(order.created_at)

  return (
    <div
      className={clsx(
        'px-18 pt-16 pb-4 text-regular-15 md:flex md:px-40 md:pt-25',
        className
      )}
    >
      <div className="whitespace-nowrap text-red">xxёxx</div>
      <div className="mt-4 text-black/50 md:mt-0 md:ml-8">{dateString}</div>
    </div>
  )
}
