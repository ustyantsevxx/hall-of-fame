import clsx from 'clsx'
import { omit } from 'lodash-es'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { useProductsGroupedByCategories } from '../api/modules/products/hooks/useProductsGroupedByCategories'
import { parseNumberOrNull, updateRouterQuery } from '../utils'
import { IndexPageMenuGroup } from './IndexPageMenuGroup'
import { ModalProductView } from './ModalProductView'

type Props = {
  className?: string
}

export const PRODUCT_ID_QUERYSTRING_KEY = 'x'

export const IndexPageMenu: FC<Props> = ({ className }) => {
  const { data: groups } = useProductsGroupedByCategories()
  const [selectedProductId, setSelectedProductId] = useState<
    number | undefined
  >()
  const [productModalOpened, setProductModalOpened] = useState(false)

  const router = useRouter()
  const productIdFromQuery = parseNumberOrNull(
    router.query[PRODUCT_ID_QUERYSTRING_KEY]
  )

  useEffect(() => {
    if (productIdFromQuery) {
      openModalWithProduct(productIdFromQuery)
    }
  }, [productIdFromQuery])

  const openModalWithProduct = (productId: number) => {
    setSelectedProductId(productId)
    setProductModalOpened(true)
  }

  const handleProductClick = async (productId: number) => {
    openModalWithProduct(productId)
    await updateRouterQuery(router, {
      [PRODUCT_ID_QUERYSTRING_KEY]: productId
    })
  }

  const handleProductModalClose = async () => {
    setProductModalOpened(false)
    setSelectedProductId(undefined)
    await updateRouterQuery(
      router,
      omit(router.query, PRODUCT_ID_QUERYSTRING_KEY)
    )
  }

  return (
    <>
      <div className={clsx('-mb-36 sm:-mb-70', className)}>
        {groups && groups.length > 0 ? (
          groups.map(group => (
            <IndexPageMenuGroup
              key={group.category_id}
              group={group}
              onProductClick={handleProductClick}
            />
          ))
        ) : (
          <div className="text-center text-black/50 text-medium-30">
            xx xx
          </div>
        )}
      </div>

      <ModalProductView
        productId={selectedProductId as number}
        opened={productModalOpened}
        onClose={handleProductModalClose}
      />
    </>
  )
}
