import dayjs from 'dayjs'
import { FC } from 'react'

import { ORDER_STATUS_NAMES } from '../api/modules/orders/orders.constants'
import { Order } from '../api/modules/orders/orders.types'

type Props = {
  order: Order
  onClick: () => void
}

export const OrderActiveShortInfo: FC<Props> = ({ order, onClick }) => {
  const deliveryTimeDate =
    order.address &&
    dayjs(order.delivery_time ?? order.created_at).add(
      order.address?.delivery_polygon?.delivery_time ?? 0,
      'minutes'
    )

  const message = [
    `Заказ ${ORDER_STATUS_NAMES[order.status.id].toLowerCase()}`,
    deliveryTimeDate && [
      ', доставим ',
      !deliveryTimeDate.isToday() && deliveryTimeDate.format('DD MMMM'),
      ` к ${deliveryTimeDate.format('HH:mm')}`
    ]
  ]
    .flat()
    .filter(Boolean)
    .join('')

  return (
    <button
      className="block w-full grow rounded-9 bg-green px-14 pt-16 pb-14 text-white text-regular-15 md:w-auto md:grow-0 md:rounded-18 md:py-24 md:px-32 md:text-regular-17"
      onClick={() => onClick()}
    >
      {message}
    </button>
  )
}
