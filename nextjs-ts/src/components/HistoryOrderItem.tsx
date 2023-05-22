import clsx from 'clsx'
import { FC, useState } from 'react'

import { useRepeatOrder } from '../api/modules/orders/hooks/useRepeatOrder'
import { ORDER_STATUS } from '../api/modules/orders/orders.constants'
import { Order } from '../api/modules/orders/orders.types'
import { useDialogsState } from '../store/dialogs'
import { formatRuble } from '../utils/number'
import { HistoryOrderItemActions } from './HistoryOrderItemStatusActions'
import { HistoryOrderItemStatusHeaderCanceled } from './HistoryOrderItemStatusHeaderCanceled'
import { HistoryOrderItemStatusHeaderDelivered } from './HistoryOrderItemStatusHeaderDelivered'
import { HistoryOrderItemStatusHeaderInProgress } from './HistoryOrderItemStatusHeaderInProgress'
import { HistoryOrderItemStatusHeaderReadyToPickup } from './HistoryOrderItemStatusHeaderReadyToPickup'
import { OrderCancelModal } from './OrderCancelModal'
import { OrderListTable } from './OrderListTable'

type Props = {
  className?: string
  order: Order
}

const itemComponentsInProgress = {
  header: HistoryOrderItemStatusHeaderInProgress
}

const itemComponentsByStatus = {
  [ORDER_STATUS.CANCELED]: {
    header: HistoryOrderItemStatusHeaderCanceled
  },
  [ORDER_STATUS.REQUEST_PROCESSING]: itemComponentsInProgress,
  [ORDER_STATUS.COOKING]: itemComponentsInProgress,
  [ORDER_STATUS.DELIVERING]: itemComponentsInProgress,
  [ORDER_STATUS.DELIVERED]: {
    header: HistoryOrderItemStatusHeaderDelivered
  },
  [ORDER_STATUS.READY_TO_PICKUP]: {
    header: HistoryOrderItemStatusHeaderReadyToPickup
  }
}

export const HistoryOrderItem: FC<Props> = ({ order, className }) => {
  const itemComponents = itemComponentsByStatus[order.status.id]

  const [cancelModalOpened, setCancelModalOpened] = useState(false)
  const handleCancelOrder = () => {
    setCancelModalOpened(true)
  }

  const { mutateAsync: repeatOrder } = useRepeatOrder()
  const { setCartOpened } = useDialogsState()

  const handleRepeatOrder = async () => {
    await repeatOrder(order)
    setCartOpened(true)
  }

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const handleRateOrder = () => {
    // TODO доделать реализацию когда опишут ТЗ
  }

  return (
    <div
      className={clsx('shadow-20-006 overflow-hidden rounded-18', className)}
    >
      {itemComponents?.header?.({ order })}

      <div className="mt-4 bg-white px-18 pb-22 md:px-40 md:pb-30">
        <OrderListTable items={order.products} className="w-full" />

        <div className="mt-10 flex items-center justify-between">
          <HistoryOrderItemActions
            order={order}
            onRepeat={handleRepeatOrder}
            onCancel={handleCancelOrder}
            onRate={handleRateOrder}
          />

          <p className="whitespace-nowrap pl-22 text-regular-20">
            {formatRuble(order.order_price)}
          </p>
        </div>

        <OrderCancelModal
          order={order}
          opened={cancelModalOpened}
          onClose={setCancelModalOpened}
        />
      </div>
    </div>
  )
}
