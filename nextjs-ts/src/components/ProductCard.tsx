import clsx from 'clsx'
import { FC, MouseEvent } from 'react'

import { useCartItem } from '../api/modules/cart/hooks/useCartItem'
import { ProductsGroupProduct } from '../api/modules/products/products.types'
import { formatRuble } from '../utils/number'
import { AppButton } from './AppButton'
import { AppCounter } from './AppCounter'
import { AppImage } from './AppImage'
import { ProductTags } from './ProductTags'

type Props = {
  product: ProductsGroupProduct
  onClick?: (event: MouseEvent) => void
}

export const ProductCard: FC<Props> = ({ product, onClick }) => {
  const { data, setCount } = useCartItem(product)

  const count = data?.count || 0

  const handleAddToCartClick = (e: MouseEvent) => {
    e.stopPropagation()
    setCount(1)
  }

  return (
    <div className="shadow-20-006 group flex h-[140px] rounded-22 sm:h-auto  sm:flex-col">
      <div
        role="button"
        className="flex grow justify-between sm:flex-col sm:p-22"
        onClick={onClick}
      >
        <div className="cursor-pointer text-left sm:grow">
          <div
            className={clsx(
              'mask-image-gradient aspect-w-1 aspect-h-1 relative w-[140px] overflow-hidden rounded-l-12 bg-gray sm:w-auto sm:rounded-12'
            )}
          >
            {product.image ? (
              <div className="h-full w-full">
                <AppImage
                  src={product?.image}
                  alt={product.name}
                  className="transition duration-300 group-hover:scale-101"
                />
              </div>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-black/50">
                Нет изображения
              </div>
            )}

            <ProductTags
              product={product}
              className="absolute top-10 left-10 md:top-14 md:left-14"
            />
          </div>

          <button className="mt-18 hidden text-left sm:block">
            <p className="text-[20px] leading-[25px] line-clamp-3">
              {product.name}
            </p>
          </button>
        </div>

        <div className="flex flex-1 flex-col p-16 sm:p-0">
          <div className="grow sm:hidden">
            <p className="line-clamp-3 text-regular-17">{product.name}</p>
          </div>

          <div className="mt-12 flex items-end justify-between sm:mt-48 sm:grow">
            <div className="hidden flex-wrap items-center sm:flex">
              <p className="mr-10 whitespace-nowrap text-regular-20">
                {formatRuble(product.sale_price || product.price)}
              </p>

              {product.sale_price && product.price ? (
                <p className=" whitespace-nowrap text-black/50 line-through text-regular-13">
                  {formatRuble(product.price)}
                </p>
              ) : null}
            </div>

            <div
              className="cursor-default md:ml-8"
              onClick={e => e.stopPropagation()}
            >
              {count === 0 ? (
                <div className="flex items-center">
                  <AppButton
                    className="mr-10  w-90 !text-regular-15 sm:w-auto sm:!text-medium-15"
                    size="mini"
                    onClick={handleAddToCartClick}
                  >
                    <span className="hidden sm:block">Добавить</span>
                    <span className="sm:hidden">
                      {formatRuble(product.sale_price || product.price)}
                    </span>
                  </AppButton>

                  {product.price && product.sale_price ? (
                    <span className="text-black/50 line-through text-regular-13 sm:hidden">
                      {formatRuble(product.price)}
                    </span>
                  ) : null}
                </div>
              ) : (
                <AppCounter value={count} onChange={setCount} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
