import dayjs from 'dayjs'
import { FC } from 'react'

import { DELIVERY_METHOD } from '../api/modules/delivery-methods/delivery-methods.constants'
import {
  ORDER_STATUS,
  ORDER_STATUS_NAMES
} from '../api/modules/orders/orders.constants'
import { Order } from '../api/modules/orders/orders.types'
import { OrderActiveStatus } from './OrderActiveStatus'

type Props = {
  order: Order
}

export const OrderActiveModalDeliveryInfo: FC<Props> = ({ order }) => {
  const statusIdsToDisplay = [
    ORDER_STATUS.REQUEST_PROCESSING,
    ORDER_STATUS.COOKING,
    order.delivery_method.id === DELIVERY_METHOD.PICKUP
      ? ORDER_STATUS.READY_TO_PICKUP
      : ORDER_STATUS.DELIVERING
  ]
  const orderActive = statusIdsToDisplay.includes(order.status.id)
  const deliveryTimeDate =
    order.address &&
    dayjs(order.delivery_time ?? order.created_at).add(
      order.address?.delivery_polygon?.delivery_time ?? 0,
      'minutes'
    )

  const message =
    deliveryTimeDate &&
    [
      `${
        deliveryTimeDate.isToday()
          ? 'сегодня'
          : deliveryTimeDate.format('DD MMMM')
      }, `,
      `${deliveryTimeDate.format('HH:mm')}`
    ]

      .filter(Boolean)
      .join('')

  return (
    <>
      {orderActive ? (
        <>
          {order.delivery_method.id === DELIVERY_METHOD.COURIER && (
            <>
              <div className="mt-30 text-center text-black/50 text-regular-15 md:text-regular-17">
                Примерное время доставки
              </div>

              {message && (
                <div className="mt-8 text-center text-regular-17 md:text-regular-20">
                  {message}
                </div>
              )}
            </>
          )}

          <div className="mt-28 flex w-full justify-center">
            <OrderActiveStatus
              order={order}
              statusIdsToDisplay={statusIdsToDisplay}
            />
          </div>
        </>
      ) : (
        <div className="mt-30 text-center text-black/50 text-regular-17">
          {ORDER_STATUS_NAMES[order.status.id] || order.status.name}
        </div>
      )}
    </>
  )
}
