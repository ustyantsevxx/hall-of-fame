import { useMutation, useQueryClient } from 'react-query'

import { useClearCart } from '../../cart/hooks/useCartClear'
import { useCartItemAdd } from '../../cart/hooks/useCartItemAdd'
import { CART_ITEMS_QUERY_KEY } from '../../cart/hooks/useCartItems'
import { useCartItemSetCount } from '../../cart/hooks/useCartItemSetCount'
import { Order } from '../orders.types'

export const useRepeatOrder = () => {
  const queryClient = useQueryClient()

  const { mutateAsync: clearCart } = useClearCart()
  const { mutateAsync: addCartItem } = useCartItemAdd()
  const { mutateAsync: setCartItemCount } = useCartItemSetCount()

  return useMutation({
    mutationFn: async (order: Order) => {
      await clearCart()

      for (const product of order.products) {
        await addCartItem({
          product,
          count: 0
        })
        await setCartItemCount({
          productId: product.id,
          count: product.quantity
        })
      }

      await queryClient.invalidateQueries(CART_ITEMS_QUERY_KEY)
    }
  })
}
