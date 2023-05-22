import { useQuery, UseQueryOptions } from 'react-query'

import { CartService } from '../cart.service'
import { CartItemType } from '../cart.types'

export const CART_ITEMS_QUERY_KEY = 'cartItems'

export const getCartItemsQuery = (): UseQueryOptions<CartItemType[]> => ({
  queryKey: CART_ITEMS_QUERY_KEY,
  queryFn: async () => CartService.getCartItems(),
  staleTime: Number.POSITIVE_INFINITY
})

export const useCartItems = () => {
  return useQuery(getCartItemsQuery())
}
