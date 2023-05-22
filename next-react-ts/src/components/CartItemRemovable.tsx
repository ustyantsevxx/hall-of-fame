import Link from 'next/link'
import { FC } from 'react'

import { CartItemType } from '../api/modules/cart/cart.types'
import CloseNavSvg from '../assets/svg/CloseNav.svg'
import { formatRuble } from '../utils/number'
import { AppCounter } from './AppCounter'
import { PRODUCT_ID_QUERYSTRING_KEY } from './IndexPageMenu'

type Props = {
  item: CartItemType
  onCountChange?: (value: number) => void
  onRemove?: () => void
  hideCounter?: boolean
  hideRemove?: boolean
  priceLabel?: string
}

export const CartItemRemovable: FC<Props> = ({
  item,
  onCountChange,
  onRemove,
  hideCounter,
  priceLabel,
  hideRemove
}) => {
  return (
    <div className="border-b border-black/10 pb-14">
      <div className="flex items-start justify-between">
        <Link
          href={{
            pathname: '/',
            query: { [PRODUCT_ID_QUERYSTRING_KEY]: item.product.id }
          }}
          passHref
        >
          <a
            aria-label={`Открыть информацию о "${item.product.name}"`}
            className="mt-3 text-regular-17"
          >
            {item.product.name}
          </a>
        </Link>

        {!hideRemove && (
          <button
            className="ml-10 text-black/30"
            title="Удалить из списка"
            onClick={onRemove}
          >
            <CloseNavSvg className="h-24 w-24" />
          </button>
        )}
      </div>

      <div className="mt-21 flex items-center justify-between">
        <div className="mr-10 flex items-center ">
          <div>
            <div className="flex items-center">
              <p className="whitespace-nowrap text-regular-20">
                {formatRuble(item.product.sale_price || item.product.price)}
              </p>

              {item.product.sale_price && item.product.price ? (
                <p className="ml-10 whitespace-nowrap text-[#808080] line-through text-regular-17">
                  {formatRuble(item.product.price)}
                </p>
              ) : null}
            </div>
          </div>

          {priceLabel && (
            <div className="ml-4 flex items-center">
              <span>•</span>
              <p className="ml-6 text-pink text-medium-17">{priceLabel}</p>
            </div>
          )}
        </div>

        {!hideCounter && (
          <AppCounter value={item.count} onChange={onCountChange} min={1} />
        )}
      </div>
    </div>
  )
}
