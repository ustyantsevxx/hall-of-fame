import { CartItemProduct } from '../cart.types'
import { useCartItemAdd } from './useCartItemAdd'
import { useCartItemRemove } from './useCartItemRemove'
import { useCartItems } from './useCartItems'
import { useCartItemSetCount } from './useCartItemSetCount'

export const useCartItem = (product?: CartItemProduct) => {
  const { data: cartItems } = useCartItems()
  const cartItem = cartItems?.find(item => item.product.id === product?.id)

  const { mutate: addItem } = useCartItemAdd()
  const { mutate: removeItem } = useCartItemRemove()
  const { mutate: setCount } = useCartItemSetCount()

  const setCartItemCount = (count: number) => {
    if (product) {
      if (count === 0) {
        removeItem(product)
      } else {
        if (cartItem) {
          setCount({ productId: product.id, count })
        } else {
          addItem({
            count: 1,
            product
          })
        }
      }
    }
  }

  return {
    data: cartItem,
    setCount: setCartItemCount
  }
}
