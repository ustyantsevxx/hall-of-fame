import { useQuery, UseQueryOptions } from 'react-query'

import { CheckoutFormData } from '../../../../components/Checkout.types'
import { useCartItems } from '../../cart/hooks/useCartItems'
import { OrdersService } from '../orders.service'
import {
  OrderAdditionalProductsResponseItem,
  OrdersCalculationRequestAttrs
} from '../orders.types'
import { checkoutDataToOrderAttributes } from '../orders.utils'

export const ORDER_ADDITIONAL_PRODUCTS_QUERY_KEY = 'additional-products'

export const useOrderAdditionalProducts = (
  checkoutData: CheckoutFormData = {},
  options?: UseQueryOptions<OrderAdditionalProductsResponseItem[]> & {
    onServerError?: (error: any) => void
  }
) => {
  const { data: cartItems } = useCartItems()

  const attrs: OrdersCalculationRequestAttrs = checkoutDataToOrderAttributes({
    checkoutData,
    cartItems: cartItems?.filter(item => !item.extra) || []
  })

  const findInCart = (item: OrderAdditionalProductsResponseItem) =>
    cartItems?.find(cartItem => cartItem.product.id === item.product.id)

  return useQuery({
    queryKey: [ORDER_ADDITIONAL_PRODUCTS_QUERY_KEY, attrs],
    queryFn: async () => {
      const response = await OrdersService.getAdditionalProducts(attrs)
      return (
        response.data?.filter(item => {
          const itemInCart = findInCart(item)
          return (!itemInCart || itemInCart.count) > 0
        }) ?? []
      )
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnMount: false,
    keepPreviousData: true,
    enabled: (cartItems?.length || 0) > 0,
    ...options
  })
}
