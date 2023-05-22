import { FC } from 'react'

import { CartItemType } from '../api/modules/cart/cart.types'
import { formatRuble } from '../utils/number'

type Props = {
  item: CartItemType
}

export const CartItemPromocode: FC<Props> = ({ item }) => {
  return (
    <div className="border-b border-black/10 pb-14">
      <div className="flex items-center">
        <p className="text-regular-17">{item.product.name}</p>

        <div className="ml-auto whitespace-nowrap text-black/50 text-regular-22">
          {formatRuble(item.product.sale_price || item.product.price)}
        </div>
      </div>
    </div>
  )
}
