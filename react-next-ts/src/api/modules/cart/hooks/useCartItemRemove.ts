import { useDeleteMutation } from '../../../shared/hooks'
import { CartService } from '../cart.service'
import { CartItemProduct, CartItemType } from '../cart.types'
import { CART_ITEMS_QUERY_KEY } from './useCartItems'

export const useCartItemRemove = () => {
  return useDeleteMutation<CartItemType, CartItemProduct>({
    itemsQueryKey: CART_ITEMS_QUERY_KEY,
    mutationFn: (data: CartItemProduct) => CartService.removeCartItem(data),
    equalsToTargetItemFn: (item, dto) => item.product.id === dto.id,
    invalidateOnSettled: false
  })
}
