import { FC, useContext } from 'react'

import { CartItemType } from '../api/modules/cart/cart.types'
import { useCartItemRemove } from '../api/modules/cart/hooks/useCartItemRemove'
import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import { useCartItemSetCount } from '../api/modules/cart/hooks/useCartItemSetCount'
import { useProduct } from '../api/modules/products/hooks/useProduct'
import { useProductsByIds } from '../api/modules/products/hooks/useProductsByIds'
import { CartConfigurationContext } from './CartConfiguration'
import { CartItemRemovable } from './CartItemRemovable'

const PROMOCODE_PRODUCT_PREFIX = 999_999

export const CartConfigurationItems: FC = () => {
  const cartConfigurationContext = useContext(CartConfigurationContext)

  const { mutate: setItemCount } = useCartItemSetCount()
  const { mutate: removeItem } = useCartItemRemove()

  const { data: promocodeProducts } = useProductsByIds(
    cartConfigurationContext.calculations?.promocode_product_ids || []
  )

  const { data: birthdayProduct } = useProduct(
    cartConfigurationContext.calculations?.birth_day_product_id as number,
    {
      enabled: !!cartConfigurationContext.calculations?.birth_day_product_id
    }
  )

  const { data: cartItems } = useCartItems()

  const promocodeCartItems: CartItemType[] = [
    ...(promocodeProducts?.map(promocodeProduct => ({
      product: {
        ...promocodeProduct,
        image: promocodeProduct.image?.url || '',
        price: 0,
        sale_price: 0,
        id: PROMOCODE_PRODUCT_PREFIX + promocodeProduct.id
      },
      count: 1
    })) || [])
  ]

  const cancelBirthdayProduct = () => {
    cartConfigurationContext.setBirthdayProductCanceled?.(true)
  }

  return (
    <div className="space-y-14">
      {cartItems
        ?.filter(x => !x.extra)
        ?.map(item => (
          <CartItemRemovable
            key={item.product.id}
            item={item}
            onCountChange={count =>
              setItemCount({ productId: item.product.id, count })
            }
            onRemove={() => removeItem(item.product)}
          />
        ))}
      {promocodeCartItems?.map(item => (
        <CartItemRemovable
          key={item.product.id}
          item={item}
          hideRemove
          hideCounter
          priceLabel="Подарок по промокоду"
        />
      ))}

      {birthdayProduct && !cartConfigurationContext.birthdayProductCanceled && (
        <CartItemRemovable
          key={birthdayProduct.id}
          item={{
            product: {
              ...birthdayProduct,
              image: birthdayProduct?.image?.url || '',
              price: 0,
              sale_price: 0,
              id: PROMOCODE_PRODUCT_PREFIX + birthdayProduct.id
            },
            count: 1
          }}
          onRemove={cancelBirthdayProduct}
          hideCounter
          priceLabel="Подарок на День рождения"
        />
      )}
    </div>
  )
}
