import { useInfiniteQuery, UseInfiniteQueryOptions } from 'react-query'

import { useAuth } from '../../auth/hooks/useAuth'
import { OrdersService } from '../orders.service'
import { OrdersPaginatedResponse } from '../orders.types'

export const ORDERS_INFINITE_QUERY_KEY = 'ordersInfinite'

export const getOrdersQuery =
  (): UseInfiniteQueryOptions<OrdersPaginatedResponse> => ({
    queryKey: ORDERS_INFINITE_QUERY_KEY,
    queryFn: ({ pageParam = 1 }) =>
      OrdersService.getPaginatedOrders({ page: pageParam, perPage: 5 }),
    getNextPageParam: lastPage =>
      lastPage?.meta?.last_page === lastPage?.meta?.current_page
        ? undefined
        : lastPage?.meta?.current_page + 1
  })

export const useOrdersInfinite = () => {
  const { user } = useAuth()

  return useInfiniteQuery({
    ...getOrdersQuery(),
    refetchOnMount: false,
    enabled: !!user
  })
}
