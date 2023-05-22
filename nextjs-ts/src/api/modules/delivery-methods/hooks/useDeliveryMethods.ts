import { useQuery, UseQueryOptions } from 'react-query'

import { DeliveryMethodsService } from '../delivery-methods.service'
import { DeliveryMethod } from '../delivery-methods.types'

export const DELIVERY_METHODS_QUERY_KEY = 'delivery-methods'

export const getDeliveryMethodsQuery = (): UseQueryOptions<
  DeliveryMethod[]
> => ({
  queryKey: DELIVERY_METHODS_QUERY_KEY,
  queryFn: () => DeliveryMethodsService.getDeliveryMethods(),
  refetchOnMount: false
})

export const useDeliveryMethods = () => {
  return useQuery(getDeliveryMethodsQuery())
}
