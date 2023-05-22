import { useCreateMutation } from '../../../shared/hooks'
import { CartService } from '../cart.service'
import { CartItemType } from '../cart.types'
import { CART_ITEMS_QUERY_KEY } from './useCartItems'

export const useCartItemAdd = () => {
  return useCreateMutation<CartItemType>({
    itemsQueryKey: CART_ITEMS_QUERY_KEY,
    mutationFn: (cartItem: CartItemType) => CartService.addCartItem(cartItem),
    invalidateOnSettled: false
  })
}
