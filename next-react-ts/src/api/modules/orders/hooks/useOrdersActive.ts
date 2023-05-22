import dayjs from 'dayjs'
import { useQuery, UseQueryOptions } from 'react-query'

import { useAuth } from '../../auth/hooks/useAuth'
import { OrdersService } from '../orders.service'
import { Order } from '../orders.types'

export const ORDERS_ACTIVE_QUERY_KEY = 'ordersActive'

export const getOrdersActiveQuery = (): UseQueryOptions<Order[]> => ({
  queryKey: ORDERS_ACTIVE_QUERY_KEY,
  queryFn: () => OrdersService.getActiveOrders(),
  refetchInterval: dayjs.duration(30, 'seconds').asMilliseconds()
})

export const useOrdersActive = () => {
  const { user } = useAuth()

  return useQuery({
    ...getOrdersActiveQuery(),
    enabled: !!user
  })
}
