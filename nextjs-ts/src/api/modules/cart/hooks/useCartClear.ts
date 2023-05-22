import { useMutation, useQueryClient } from 'react-query'

import { CartService } from '../cart.service'
import { CART_ITEMS_QUERY_KEY } from './useCartItems'

export const useClearCart = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => CartService.clearCart(),
    onSettled: () => {
      queryClient.invalidateQueries(CART_ITEMS_QUERY_KEY)
    }
  })
}
