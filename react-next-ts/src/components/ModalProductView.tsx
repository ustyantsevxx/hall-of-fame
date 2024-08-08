import { Dialog } from '@headlessui/react'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'

import { useCartItem } from '../api/modules/cart/hooks/useCartItem'
import { useProduct } from '../api/modules/products/hooks/useProduct'
import { Product } from '../api/modules/products/products.types'
import { updateRouterQuery } from '../utils'
import { formatRuble } from '../utils/number'
import { AppButton } from './AppButton'
import { AppCounter } from './AppCounter'
import { AppImage } from './AppImage'
import { AppModal } from './AppModal'
import { AppTransition } from './AppTransition'
import { PRODUCT_ID_QUERYSTRING_KEY } from './IndexPageMenu'
import { ProductTags } from './ProductTags'
import { ProductViewAttributes } from './ProductViewAttributes'
import { ProductViewDescription } from './ProductViewDescription'
import { ProductViewCompositionProducts } from './ProductViewxxompositionProducts'

type Props = {
  opened: boolean
  className?: string
  productId: number
  onClose: (value: boolean) => void
}

export const PRODUCT_ID_FROM_QUERYSTRING_KEY = 'x_f'

export const ModalProductView: FC<Props> = ({ onClose, opened, productId }) => {
  const { data: product } = useProduct(productId)
  const [localProduct, setLocalProduct] = useState<Product>()
  const imageUrl = localProduct?.image?.url || ''

  const { data, setCount } = useCartItem({
    ...(localProduct as Product),
    image: localProduct?.image?.url || ''
  })

  const addToCart = () => setCount(1)
  const count = data?.count || 0

  useEffect(() => {
    if (opened && product) {
      setLocalProduct(product)
    }
  }, [opened, product])

  const router = useRouter()

  const handleModalClose = async () => {
    const productIdFrom = router.query[PRODUCT_ID_FROM_QUERYSTRING_KEY]
    if (productIdFrom) {
      await updateRouterQuery(router, {
        [PRODUCT_ID_QUERYSTRING_KEY]: productIdFrom
      })
    } else {
      onClose(false)
    }
  }

  return (
    <AppModal
      emptyFocusTrap
      wrapperClassName="overflow-y-auto"
      contentWrapperClassName="!m-0 flex grow"
      headerClassName="px-10 pt-10 !text-white md:!hidden"
      panelClassName="md:max-w-[801px] !p-0 md:!p-30 overflow-x-hidden"
      opened={opened}
      onClose={handleModalClose}
      onClosed={() => setLocalProduct(undefined)}
    >
      <div className="flex max-w-full flex-grow flex-col md:flex-row md:pr-10 ">
        <div className="aspect-w-1 sticky top-0 flex h-[375px] w-full flex-shrink-0 items-center justify-center overflow-hidden bg-gray md:block md:h-[380px] md:w-[380px] md:rounded-12">
          <AppTransition show={!!imageUrl}>
            <div className="relative h-full w-full">
              {imageUrl && <AppImage src={imageUrl} alt={localProduct?.name} />}

              {localProduct && (
                <ProductTags
                  product={localProduct}
                  className="absolute top-16 left-16 md:top-14 md:left-14"
                  tagContentClassName="!w-18 !h-18 flex items-center justify-center"
                  tagClassName="!w-26 !h-26"
                  tagContentContainerClassName="!text-[9px] leading-[11px] "
                />
              )}
            </div>
          </AppTransition>

          {product && !imageUrl && (
            <div className="relative flex h-full w-full items-center justify-center text-black/50">
              xx xx
            </div>
          )}
        </div>

        <AppTransition
          show={!!localProduct}
          className="z-10 -mt-20 flex w-full flex-grow flex-col rounded-t-22 bg-white px-16 pt-22 md:mt-10 md:ml-30 md:px-0 md:pt-0"
        >
          <Dialog.Title as="h3" className="text-medium-20">
            {localProduct?.name}
          </Dialog.Title>

          {localProduct && (
            <ProductViewCompositionProducts
              className="mt-6"
              product={localProduct}
            />
          )}

          {(localProduct?.description || localProduct?.composition) && (
            <ProductViewDescription product={localProduct} className="mt-10" />
          )}

          <div className="mt-15 flex items-center justify-between md:hidden">
            <p className="text-regular-17">xx</p>

            <div className="flex items-center text-regular-17">
              {localProduct?.sale_price && localProduct.price ? (
                <p className="whitespace-nowrap text-black/50 line-through">
                  {formatRuble(localProduct?.price ?? 0)}
                </p>
              ) : null}

              <p className="ml-10 whitespace-nowrap">
                {formatRuble(localProduct?.sale_price || localProduct?.price)}
              </p>
            </div>
          </div>

          {!!localProduct && (
            <ProductViewAttributes product={localProduct} className="my-20" />
          )}

          <div className="mt-auto hidden h-42 items-center justify-between md:flex">
            <div className="flex items-center">
              <p className="whitespace-nowrap  text-medium-22">
                {formatRuble(localProduct?.sale_price || localProduct?.price)}
              </p>

              {localProduct?.sale_price && localProduct.price ? (
                <p className="ml-10 whitespace-nowrap text-black/50 line-through text-regular-15">
                  {formatRuble(localProduct?.price ?? 0)}
                </p>
              ) : null}
            </div>

            {count > 0 ? (
              <AppCounter value={count} onChange={setCount} />
            ) : (
              <AppButton onClick={() => addToCart()}>xx</AppButton>
            )}
          </div>

          <div className="sticky bottom-0 z-20 mt-auto flex w-full bg-white py-6 md:hidden">
            {count > 0 ? (
              <div className="flex w-full justify-between">
                <p className="block text-medium-22">
                  {formatRuble(localProduct?.sale_price || localProduct?.price)}
                </p>
                <AppCounter value={count} onChange={setCount} />
              </div>
            ) : (
              <AppButton
                className="mx-auto w-[345px] max-w-full"
                onClick={() => addToCart()}
              >
                xx xx xx xx{' '}
                {formatRuble(localProduct?.sale_price || localProduct?.price)}
              </AppButton>
            )}
          </div>
        </AppTransition>
      </div>
    </AppModal>
  )
}
