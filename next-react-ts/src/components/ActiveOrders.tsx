import clsx from 'clsx'
import { omit } from 'lodash-es'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { useOrdersActive } from '../api/modules/orders/hooks/useOrdersActive'
import { NEED_SHOW_ORDER_WITH_ID_KEY } from '../api/modules/orders/orders.constants'
import { Order } from '../api/modules/orders/orders.types'
import { useCurrentBreakpoint } from '../hooks/useCurrentBreakpoint'
import { parseNumberOrNull, updateRouterQuery } from '../utils'
import { AppTransition } from './AppTransition'
import { OrderActiveModal } from './OrderActiveModal'
import { OrderActiveShortInfo } from './OrderActiveShortInfo'
import { OrderCancelModal } from './OrderCancelModal'

type Props = {
  className?: string
}

export const ActiveOrders: FC<Props> = ({ className }) => {
  const { data: orders } = useOrdersActive()
  const router = useRouter()

  const [statusModalOpened, setStatusModalOpened] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<Order>()
  const showOrder = (order: Order) => {
    setSelectedOrder(order)
    setStatusModalOpened(true)
  }

  const [cancelModalOpened, setCancelModalOpened] = useState(false)
  const openCancelOrderModal = () => {
    setStatusModalOpened(false)
    setCancelModalOpened(true)
  }

  useEffect(() => {
    const orderIdToShowFromQuery = router.query[NEED_SHOW_ORDER_WITH_ID_KEY]
    const id = parseNumberOrNull(orderIdToShowFromQuery)
    if (id) {
      const orderToShow = orders?.find(order => order.id === id)

      if (orderToShow) {
        setSelectedOrder(orderToShow)
        setStatusModalOpened(true)
        updateRouterQuery(
          router,
          omit(router.query, NEED_SHOW_ORDER_WITH_ID_KEY)
        )
      }
      updateRouterQuery(router, omit(router.query, NEED_SHOW_ORDER_WITH_ID_KEY))
    } else {
      const newSelectedOrderState = orders?.find(
        order => order.id === selectedOrder?.id
      )

      if (!newSelectedOrderState) {
        setStatusModalOpened(false)
      }

      setSelectedOrder(newSelectedOrderState)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orders, selectedOrder])

  const { breakpoint } = useCurrentBreakpoint()
  const isSmallScreen = ['xs', 'sm'].includes(breakpoint)
  const visibleOrders = isSmallScreen
    ? ([orders?.[0]].filter(Boolean) as Order[])
    : orders || []

  return (
    <>
      <AppTransition show={visibleOrders.length > 0} className="w-full">
        <div className={clsx('w-full', className)}>
          <div className="space-y-12">
            {visibleOrders.map(order => (
              <OrderActiveShortInfo
                key={order.id}
                order={order}
                onClick={() => showOrder(order)}
              />
            ))}
          </div>
        </div>
      </AppTransition>

      <OrderActiveModal
        order={selectedOrder}
        opened={statusModalOpened}
        onClose={setStatusModalOpened}
        onCancel={openCancelOrderModal}
      />

      <OrderCancelModal
        order={selectedOrder}
        opened={cancelModalOpened}
        onClose={setCancelModalOpened}
      />
    </>
  )
}
