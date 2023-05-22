import { useUpdateMutation } from '../../../shared/hooks'
import { CartService } from '../cart.service'
import { CartItemType } from '../cart.types'
import { CART_ITEMS_QUERY_KEY } from './useCartItems'

type UpdateCartCountDto = {
  productId: number
  count: number
}

export const useCartItemSetCount = () => {
  return useUpdateMutation<CartItemType, UpdateCartCountDto>({
    itemsQueryKey: CART_ITEMS_QUERY_KEY,
    mutationFn: (data: UpdateCartCountDto) =>
      CartService.setCartItemCount(data.productId, data.count),
    equalsToTargetItemFn: (item, dto) => item.product.id === dto.productId,
    invalidateOnSettled: false
  })
}
