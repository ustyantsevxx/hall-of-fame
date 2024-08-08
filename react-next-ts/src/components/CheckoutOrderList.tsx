import clsx from 'clsx'
import { getCookie } from 'cookies-next'
import { FC, useContext } from 'react'
import { useFormContext, UseFormReturn } from 'react-hook-form'

import { PERSON_COUNT_PRODUCT_ID } from '../api/modules/cart/cart.constants'
import { useCartItems } from '../api/modules/cart/hooks/useCartItems'
import { useCartTotalCost } from '../api/modules/cart/hooks/useCartTotalCost'
import { usePersonCountState } from '../api/modules/cart/hooks/usePersonCount'
import { useOrderAdditionalProducts } from '../api/modules/orders/hooks/useOrderAdditionalProducts'
import { BIRTHDAY_COOKIES_KEY } from '../api/modules/orders/orders.constants'
import {
  OrderAdditionalProductsResponseItem,
  OrderProduct
} from '../api/modules/orders/orders.types'
import { getTotalCostFromCalculations } from '../api/modules/orders/orders.utils'
import { useProduct } from '../api/modules/products/hooks/useProduct'
import { useProductsByIds } from '../api/modules/products/hooks/useProductsByIds'
import { formatRuble } from '../utils/number'
import { AppTransition } from './AppTransition'
import { CheckoutFormData } from './Checkout.types'
import { CheckoutContext } from './Checkout.utils'
import { OrderListTable } from './OrderListTable'

type Props = {
  className?: string
}

const PROMOCODE_PRODUCT_PREFIX = 99_999

export const CheckoutOrderList: FC<Props> = ({ className }) => {
  const checkoutContext = useContext(CheckoutContext)
  const { getValues }: UseFormReturn<CheckoutFormData> = useFormContext()

  const { data: promocodeProducts } = useProductsByIds(
    checkoutContext.calculations?.promocode_product_ids || []
  )

  const { data: birthdayProduct } = useProduct(
    checkoutContext.calculations?.birth_day_product_id as number,
    {
      enabled: !!checkoutContext.calculations?.birth_day_product_id
    }
  )

  const { data: cartItems, isLoading } = useCartItems()
  const { data: extraProducts } = useOrderAdditionalProducts(
    {},
    { enabled: !!cartItems }
  )

  const findInCart = (item: OrderAdditionalProductsResponseItem) =>
    cartItems?.find(cartItem => cartItem.product.id === item.product.id)

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

  const { personCount } = usePersonCountState()

  const orderItems: OrderProduct[] = [
    ...(cartItems
      ?.filter(x => !x.extra)
      ?.map(cartItem => ({
        id: cartItem.product.id,
        name: cartItem.product.name,
        price: cartItem.product.sale_price || cartItem.product.price,
        sale_price: 0,
        quantity: cartItem.count,
        description: cartItem.product.description ?? '',
        image: cartItem.product.image ?? ''
      })) || []),
    ...(promocodeProducts?.map(promocodeProduct => ({
      ...promocodeProduct,
      id: PROMOCODE_PRODUCT_PREFIX + promocodeProduct.id,
      description: promocodeProduct.description ?? '',
      image: promocodeProduct.image?.url ?? '',
      quantity: 1,
      price: 0
    })) || []),
    ...(extraProducts?.map(cartItem => ({
      id: cartItem.product.id,
      name: cartItem.product.name,
      price: getPrice(cartItem),
      sale_price: 0,
      quantity: getCount(cartItem),
      description: cartItem.product.description ?? '',
      image: cartItem.product.image?.url ?? ''
    })) || []),
    {
      id: PERSON_COUNT_PRODUCT_ID,
      name: 'xx',
      price: 0,
      sale_price: 0,
      quantity: personCount ?? 1,
      description: '',
      image: ''
    },
    ...(!getCookie(BIRTHDAY_COOKIES_KEY) && birthdayProduct
      ? [
          {
            ...birthdayProduct,
            quantity: 1,
            price: 0,
            description: '',
            image: ''
          }
        ]
      : [])
  ]

  const { total: localTotal } = useCartTotalCost()
  const { total } = getTotalCostFromCalculations(checkoutContext.calculations)

  const messages = [
    {
      key: 'promocode',
      text: 'xx xx',
      visible: checkoutContext.calculations?.promocode_used
    },
    {
      key: 'bonuscoins',
      text: `xx ${getValues('bonusCoinsToUse')}`,
      visible: checkoutContext.calculations?.coins_sub
    }
  ]

  const visibleMessages = messages.filter(({ visible }) => visible)

  return (
    <div
      className={clsx('md:rounded-22 md:bg-gray md:py-34 md:px-40', className)}
    >
      <AppTransition show={!isLoading}>
        <h2 className="text-black/50 text-regular-17 md:text-black md:text-regular-26">
          xx xx xx {formatRuble(total || localTotal)}
        </h2>

        <div className="mt-16 border-t md:mt-8 md:border-t-0">
          <OrderListTable
            items={orderItems}
            className="w-full"
            cellClassName="!py-16"
          />
        </div>

        {visibleMessages.length > 0 && (
          <div className="hidden border-t border-black/10 pt-24 md:block">
            {visibleMessages.map(({ text, key }) => (
              <div key={key} className="text-black/50 text-regular-15">
                {text}
              </div>
            ))}
          </div>
        )}
      </AppTransition>

      {isLoading && (
        <p className="text-black/50 text-regular-17 md:text-black md:text-regular-26">
          xx...
        </p>
      )}
    </div>
  )
}
