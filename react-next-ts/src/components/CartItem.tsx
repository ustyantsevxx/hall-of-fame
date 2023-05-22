import clsx from 'clsx'
import { FC } from 'react'

import { CartItemType } from '../api/modules/cart/cart.types'
import { formatRuble } from '../utils/number'
import { AppCounter } from './AppCounter'

type Props = {
  item?: CartItemType
  price?: number
  name?: string
  count?: number
  priceHidden?: boolean
  className?: string
  onCountChange: (value: number) => void
}

export const CartItem: FC<Props> = ({
  item,
  price,
  count,
  priceHidden,
  className,
  onCountChange,
  name
}) => {
  return (
    <div className={clsx('border-b border-black/10 pb-14', className)}>
      <div className="flex items-center">
        <p className="text-regular-17">{name ?? item?.product.name}</p>

        <div className="ml-auto mr-38 whitespace-nowrap text-black/50 text-regular-22">
          {!priceHidden &&
            formatRuble(
              price || item?.product.sale_price || item?.product.price
            )}
        </div>

        <div className="">
          <AppCounter
            value={count ?? item?.count ?? 1}
            onChange={onCountChange}
            min={0}
          />
        </div>
      </div>
    </div>
  )
}
