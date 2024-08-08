import clsx from 'clsx'
import { FC } from 'react'

import { OrderProduct } from '../api/modules/orders/orders.types'
import { formatRuble } from '../utils/number'

type Props = {
  className?: string
  cellClassName?: string
  items: OrderProduct[]
}

export const OrderListTable: FC<Props> = ({
  items,
  className,
  cellClassName
}) => {
  return (
    <table className={clsx('table-auto', className)}>
      <thead className="sr-only">
        <tr>
          <th>xx</th>
          <th>xx</th>
          <th>xx</th>
        </tr>
      </thead>

      <tbody>
        {items.map((orderItem, orderItemIndex) => (
          <tr
            key={orderItem.id}
            className={clsx('border-b', {
              'border-black/10': orderItemIndex < items.length - 1
            })}
          >
            <td className={clsx('py-12 pr-15 md:pr-20', cellClassName)}>
              {orderItem.name}
            </td>
            <td
              className={clsx(
                'whitespace-nowrap py-12 text-right text-black/50',
                cellClassName
              )}
            >
              {`${orderItem.quantity} xx`}
            </td>
            <td
              className={clsx(
                'whitespace-nowrap  py-12 pl-20 text-right',
                cellClassName
              )}
            >{`${formatRuble(orderItem.price)}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
