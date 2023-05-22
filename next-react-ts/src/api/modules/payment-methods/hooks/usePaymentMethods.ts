import { useQuery, UseQueryOptions } from 'react-query'

import { PaymentMethodsService } from '../payment-methods.service'
import { PaymentMethod } from '../payment-methods.types'

export const PAYMENT_METHODS_QUERY_KEY = 'payment-methods'

export const getPaymentMethodsQuery = (): UseQueryOptions<PaymentMethod[]> => ({
  queryKey: PAYMENT_METHODS_QUERY_KEY,
  queryFn: () => PaymentMethodsService.getPaymentMethods(),
  refetchOnMount: false
})

export const usePaymentMethods = () => {
  return useQuery(getPaymentMethodsQuery())
}
