import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'

import { CheckoutFormData } from '../../../../components/Checkout.types'
import { useCartItems } from '../../cart/hooks/useCartItems'
import { OrdersService } from '../orders.service'
import {
  OrdersCalculationRequestAttrs,
  OrdersCalculationResponse
} from '../orders.types'
import { checkoutDataToOrderAttributes } from '../orders.utils'

export const ORDER_CALCULATIONS_QUERY_KEY = 'orders-calculations'

export const useOrdersCalculations = (
  checkoutData: CheckoutFormData = {},
  options?: UseQueryOptions<OrdersCalculationResponse> & {
    onServerError?: (error: any) => void
  }
) => {
  const { data: cartItems } = useCartItems()
  const queryClient = useQueryClient()

  const attrs: OrdersCalculationRequestAttrs = checkoutDataToOrderAttributes({
    checkoutData,
    cartItems: cartItems || []
  })

  return useQuery({
    queryKey: [ORDER_CALCULATIONS_QUERY_KEY, attrs],
    queryFn: async () => {
      const previousCalculations = queryClient.getQueryData([
        ORDER_CALCULATIONS_QUERY_KEY,
        attrs
      ]) as OrdersCalculationResponse

      try {
        const response = await OrdersService.calculateOrder(attrs)
        return response.data as OrdersCalculationResponse
      } catch (error: any) {
        options?.onError?.(error)

        return previousCalculations
      }
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnMount: false,
    enabled: (cartItems?.length || 0) > 0,
    keepPreviousData: true,
    ...options
  })
}
