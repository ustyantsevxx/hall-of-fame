import { useQuery, UseQueryOptions } from 'react-query'

import { useAuth } from '../../auth/hooks/useAuth'
import { OrdersService } from '../orders.service'
import { Order } from '../orders.types'

export const ORDER_QUERY_KEY = 'order'

export const getOrder = (id?: number): UseQueryOptions<Order | null> => ({
  queryKey: ORDER_QUERY_KEY,
  queryFn: () => (id ? OrdersService.getOrder(id) : Promise.resolve(null))
})

export const useOrder = (id?: number) => {
  const { user } = useAuth()

  return useQuery({
    ...getOrder(id),
    enabled: !!user && id !== undefined
  })
}
