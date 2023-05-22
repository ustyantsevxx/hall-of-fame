import { useMutation, useQueryClient } from 'react-query'

import { CheckoutFormData } from '../../../../components/Checkout.types'
import { NEW_ADDRESS_KEY } from '../../addresses/address.constants'
import { AddressesService } from '../../addresses/addresses.service'
import { CartItemType } from '../../cart/cart.types'
import { useCartItems } from '../../cart/hooks/useCartItems'
import { usePersonCountState } from '../../cart/hooks/usePersonCount'
import {
  DELIVERY_METHOD,
  DELIVERY_TIME_TYPE
} from '../../delivery-methods/delivery-methods.constants'
import { getUserQuery } from '../../user/hooks/useUser'
import { OrdersService } from '../orders.service'
import { NewOrderAttributes } from '../orders.types'
import { useOrderAdditionalProducts } from './useOrderAdditionalProducts'
import { ORDERS_ACTIVE_QUERY_KEY } from './useOrdersActive'
import { ORDERS_INFINITE_QUERY_KEY } from './useOrdersInfinite'

const getOrCreateAddressId = async (formData: CheckoutFormData) => {
  const needToCreateNewAddress =
    formData.deliveryMethod?.typeId === DELIVERY_METHOD.COURIER &&
    formData.deliveryMethod?.addressId === NEW_ADDRESS_KEY

  if (needToCreateNewAddress) {
    if (formData.deliveryMethod?.newAddress) {
      const newAddress = await AddressesService.addAddress({
        ...formData.deliveryMethod?.newAddress,
        geo_point: {
          lat: formData.deliveryMethod.addressCoords?.lat || 0,
          lng: formData.deliveryMethod.addressCoords?.lng || 0
        }
      })

      return newAddress.data.id
    }
  } else {
    return formData.deliveryMethod?.addressId
  }
}

const formDataToOrderAttributes = async ({
  formData,
  cartItems,
  additionalProducts,
  personCount
}: {
  formData: CheckoutFormData
  cartItems: CartItemType[]
  additionalProducts: CartItemType[]
  personCount: number
}) => {
  return {
    delivery_method_id: formData.deliveryMethod?.typeId as number,
    payment_method_id: formData.paymentMethod?.typeId as number,
    change_banknote: formData.paymentMethod?.changeBanknote,
    address_id:
      formData.deliveryMethod?.typeId === DELIVERY_METHOD.PICKUP
        ? undefined
        : await getOrCreateAddressId(formData),
    restraunt_id: formData.deliveryMethod?.restaurantId,
    comment: formData.comment || '',
    products:
      cartItems
        .filter(item => !item.extra)
        ?.map(cartItem => ({
          id: cartItem.product.id,
          quantity: cartItem.count
        })) || [],
    promocode: formData.promoCode,
    coins_count: formData.promoCode
      ? undefined
      : (formData.bonusCoinsToUse || 0) > 0
      ? formData.bonusCoinsToUse
      : undefined,
    additional_products:
      additionalProducts?.map(cartItem => ({
        id: cartItem.product.id,
        quantity: cartItem.count
      })) || [],
    delivery_time:
      formData.deliveryTime?.typeId === DELIVERY_TIME_TYPE.EXACT_TIME
        ? formData.deliveryTime?.exactTime
        : undefined,
    num_persons: personCount,
    without_birth_day: formData.withoutBirthdayProduct
  } as NewOrderAttributes
}

export const useCreateOrder = () => {
  const queryClient = useQueryClient()
  const { data: cartItems } = useCartItems()
  const { personCount } = usePersonCountState()

  const { data: extraProducts } = useOrderAdditionalProducts()

  const additionalProducts =
    extraProducts
      ?.filter(x => {
        const item = cartItems?.find(item => item.product.id === x.product.id)
        return !item || item.count > 0
      })
      ?.map(x => {
        const cartItem = cartItems?.find(
          item => item.product.id === x.product.id
        )
        if (cartItem) {
          return {
            product: x.product,
            extra: true,
            count: cartItem.count
          }
        }

        return {
          product: x.product,
          count: x.free_count,
          extra: true
        }
      }) || []

  return useMutation({
    mutationFn: async (formData: CheckoutFormData) => {
      const newOrder = await formDataToOrderAttributes({
        formData,
        additionalProducts: additionalProducts as CartItemType[],
        cartItems: cartItems || [],
        personCount: personCount ?? 0
      })
      return OrdersService.createOrder(newOrder)
    },
    onSettled: () => {
      queryClient.invalidateQueries(ORDERS_ACTIVE_QUERY_KEY)
      queryClient.invalidateQueries(ORDERS_INFINITE_QUERY_KEY)
      queryClient.invalidateQueries(getUserQuery())
    }
  })
}
