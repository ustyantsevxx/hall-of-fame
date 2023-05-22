import clsx from 'clsx'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { Product } from '../api/modules/products/products.types'
import { updateRouterQuery } from '../utils'
import { PRODUCT_ID_QUERYSTRING_KEY } from './IndexPageMenu'
import { PRODUCT_ID_FROM_QUERYSTRING_KEY } from './ModalProductView'

type Props = {
  className?: string
  product: Product
}

export const ProductViewCompositionProducts: FC<Props> = ({
  product,
  className
}) => {
  const router = useRouter()
  const handleCompositionProductClick = async (productId: number) => {
    await updateRouterQuery(router, {
      [PRODUCT_ID_QUERYSTRING_KEY]: productId,
      [PRODUCT_ID_FROM_QUERYSTRING_KEY]: product.id
    })
  }

  return (
    <div className={clsx('-mx-2 flex flex-wrap', className)}>
      {product?.composition_products?.map((compositionProduct, index) => (
        <>
          <button
            key={compositionProduct.id}
            className="inline-block px-2 text-green hover:text-green-button-hover"
            onClick={() => handleCompositionProductClick(compositionProduct.id)}
          >
            {compositionProduct.name}
            {index === (product.composition_products?.length || 0) - 1
              ? '.'
              : ', '}
          </button>
        </>
      ))}
    </div>
  )
}
