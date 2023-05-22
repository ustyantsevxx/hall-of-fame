import {
  InfiniteData,
  QueryClient,
  useMutation,
  useQueryClient
} from 'react-query'

import { ORDER_STATUS, ORDER_STATUS_NAMES } from '../orders.constants'
import { OrdersService } from '../orders.service'
import { Order, OrdersPaginatedResponse } from '../orders.types'
import { ORDERS_ACTIVE_QUERY_KEY } from './useOrdersActive'
import { ORDERS_INFINITE_QUERY_KEY } from './useOrdersInfinite'

const getOrdersWithCancelled = ({
  orders,
  orderToCancel
}: {
  orders: Order[]
  orderToCancel: Order
}) => {
  return orders.map(o => {
    return o.id === orderToCancel.id
      ? {
          ...o,
          status: {
            id: ORDER_STATUS.CANCELED,
            name: ORDER_STATUS_NAMES[ORDER_STATUS.CANCELED]
          }
        }
      : o
  })
}

const updateOrderHistory = (
  queryClient: QueryClient,
  { order }: { order: Order }
) => {
  const orderHistoryPages = queryClient.getQueryData<
    InfiniteData<OrdersPaginatedResponse>
  >(ORDERS_INFINITE_QUERY_KEY)

  const updateOrderHistoryPages =
    orderHistoryPages?.pages?.map(page => ({
      ...page,
      data: getOrdersWithCancelled({
        orders: page.data,
        orderToCancel: order
      })
    })) || []

  queryClient.setQueryData(ORDERS_INFINITE_QUERY_KEY, {
    pages: updateOrderHistoryPages,
    pageParams: orderHistoryPages?.pageParams
  } as InfiniteData<OrdersPaginatedResponse>)
}

const updateActiveOrders = (
  queryClient: QueryClient,
  { order }: { order: Order }
) => {
  const activeOrders =
    queryClient.getQueryData<Order[]>(ORDERS_ACTIVE_QUERY_KEY) || []

  const updatedActiveOrders = getOrdersWithCancelled({
    orders: activeOrders,
    orderToCancel: order
  }).filter(o => o.status.id !== ORDER_STATUS.CANCELED)

  queryClient.setQueryData(ORDERS_ACTIVE_QUERY_KEY, updatedActiveOrders)
}

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ order, reason }: { order: Order; reason: string }) =>
      OrdersService.cancelOrder({ orderId: order.id, reason: reason }),
    onMutate: ({ order }) => {
      updateOrderHistory(queryClient, { order })
      updateActiveOrders(queryClient, { order })
    },
    onSettled: () => {
      queryClient.invalidateQueries(ORDERS_ACTIVE_QUERY_KEY)
      queryClient.invalidateQueries(ORDERS_INFINITE_QUERY_KEY)
    }
  })
}
