import clsx from 'clsx'
import { FC } from 'react'

import {
  ORDER_STATUS_DESCRIPTION,
  ORDER_STATUS_NAMES,
  ORDER_STATUS_NAMES_PASSED
} from '../api/modules/orders/orders.constants'
import { Order } from '../api/modules/orders/orders.types'
import { OrderActiveStatusBadge } from './OrderActiveStatusBadge'

type Props = {
  order: Order
  statusIdsToDisplay: number[]
  className?: string
}

export const OrderActiveStatus: FC<Props> = ({
  order,
  statusIdsToDisplay,
  className
}) => {
  const activeStatusIndex = statusIdsToDisplay.indexOf(order.status.id)
  const activeStatusDescription =
    order && ORDER_STATUS_DESCRIPTION[order?.status.id]

  return (
    <div className={clsx('w-full px-16 md:w-auto md:px-0', className)}>
      <div className="flex w-full justify-evenly space-x-8">
        {statusIdsToDisplay.map((statusId, index) => (
          <OrderActiveStatusBadge
            key={statusId}
            name={
              index < activeStatusIndex
                ? ORDER_STATUS_NAMES_PASSED[statusId] || ''
                : ORDER_STATUS_NAMES[statusId] || '-'
            }
            active={order.status.id === statusId}
            passed={index < activeStatusIndex}
          />
        ))}
      </div>

      {activeStatusDescription && (
        <div className="mt-18 text-center text-regular-15">
          {activeStatusDescription}
        </div>
      )}
    </div>
  )
}
