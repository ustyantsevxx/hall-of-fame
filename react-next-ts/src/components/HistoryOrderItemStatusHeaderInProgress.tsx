import clsx from 'clsx'
import dayjs from 'dayjs'
import { FC } from 'react'

import { ORDER_STATUS } from '../api/modules/orders/orders.constants'
import { Order } from '../api/modules/orders/orders.types'

type Props = {
  className?: string
  order: Order
}

export const HistoryOrderItemStatusHeaderInProgress: FC<Props> = ({
  className,
  order
}) => {
  const labelByStatus = {
    [ORDER_STATUS.REQUEST_PROCESSING]: 'xx xx',
    [ORDER_STATUS.COOKING]: 'xx xx',
    [ORDER_STATUS.DELIVERING]: 'xx xx'
  }

  const deliveryTimeDate =
    order.address &&
    dayjs(order.delivery_time ?? order.created_at).add(
      order.address?.delivery_polygon?.delivery_time ?? 0,
      'minutes'
    )

  const message =
    deliveryTimeDate &&
    [
      !deliveryTimeDate.isToday() && deliveryTimeDate.format('DD MMMM'),
      ` xx ${deliveryTimeDate.format('HH:mm')}`
    ]

      .flat()
      .filter(Boolean)
      .join('')

  return (
    <div
      className={clsx(
        'bg-green px-18 pt-12 pb-12 text-regular-15 md:flex md:px-40 md:pt-25',
        className
      )}
    >
      <div className="whitespace-nowrap text-white">
        {labelByStatus[order.status.id]}
      </div>
      <div className="mt-4 text-white/80 md:mt-0 md:ml-8">
        xx xx {message}
      </div>
    </div>
  )
}
