import { FC, useContext } from 'react'

import { CartItemProduct } from '../api/modules/cart/cart.types'
import { useCartItemAdd } from '../api/modules/cart/hooks/useCartItemAdd'
import { useCartItemRemove } from '../api/modules/cart/hooks/useCartItemRemove'
import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import { useCartItemSetCount } from '../api/modules/cart/hooks/useCartItemSetCount'
import { useOrderAdditionalProducts } from '../api/modules/orders/hooks/useOrderAdditionalProducts'
import { OrderAdditionalProductsResponseItem } from '../api/modules/orders/orders.types'
import { CartConfigurationContext } from './CartConfiguration'
import { CartItem } from './CartItem'

export const CartConfigurationItemsExtra: FC = () => {
  const cartConfigurationContext = useContext(CartConfigurationContext)
  const { data: extraProducts } = useOrderAdditionalProducts({
    promoCode: cartConfigurationContext.promocode
  })
  const { data: cartItems } = useCartItems()
  const { mutate: addToCart } = useCartItemAdd()
  const { mutate: removeFromCart } = useCartItemRemove()
  const { mutate: setItemCount } = useCartItemSetCount()

  const findInCart = (item: OrderAdditionalProductsResponseItem) =>
    cartItems?.find(cartItem => cartItem.product.id === item.product.id)

  const handleCountChange = (
    item: OrderAdditionalProductsResponseItem,
    count: number
  ) => {
    const alreadyAddedToCart = findInCart(item)?.count !== undefined

    if (alreadyAddedToCart) {
      if (count === item.free_count) {
        removeFromCart(item.product as CartItemProduct)
      } else {
        setItemCount({ count, productId: item.product.id })
      }
    } else {
      addToCart({
        extra: true,
        count:
          count === 0
            ? 0
            : count < item.free_count
            ? item.free_count - 1
            : item.free_count + 1,
        product: item.product as CartItemProduct
      })
    }
  }

  const getCount = (item: OrderAdditionalProductsResponseItem) => {
    const addedCount = findInCart(item)?.count
    return addedCount ?? item.free_count
  }

  const getPrice = (item: OrderAdditionalProductsResponseItem) => {
    const addedCount = findInCart(item)?.count
    return addedCount && addedCount > item.free_count
      ? item.item_price * (addedCount - item.free_count)
      : 0
  }

  return (
    <>
      {extraProducts && extraProducts.length > 0 && cartItems && (
        <>
          <div className="mt-36 text-black/50">xx</div>
          <div className="mt-14 space-y-14">
            {extraProducts.map(item => (
              <CartItem
                key={item.product.id}
                price={getPrice(item)}
                name={item.product.name}
                count={getCount(item)}
                onCountChange={count => handleCountChange(item, count)}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}
