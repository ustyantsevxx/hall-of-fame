import { CheckoutFormData } from '../../../components/Checkout.types'
import { CartItemType } from '../cart/cart.types'
import { ORDER_CANCELABLE_STATUS_IDS } from './orders.constants'
import {
  Order,
  OrdersCalculationRequestAttrs,
  OrdersCalculationResponse
} from './orders.types'

export const checkCanCancelOrder = (order: Order) => {
  return ORDER_CANCELABLE_STATUS_IDS.includes(order.status.id)
}

export const getTotalCostFromCalculations = (
  calculations?: OrdersCalculationResponse
) => {
  if (!calculations) {
    return { total: 0, birthday: false, oldTotal: undefined }
  }

  let total = calculations.total || 0
  let birthday = false

  if (calculations.promocode_used) {
    total = calculations.total_with_promocode || 0
  }

  if (calculations.coins_sub) {
    total = calculations.total_with_coins || 0
  }

  if (calculations.total_with_additional_products > 0) {
    return {
      total: calculations.total_with_additional_products || 0,
      birthday: false,
      oldTotal: undefined
    }
  }

  if ((calculations.total_with_birth_day_discount ?? 0) > 0) {
    birthday = true
    total = calculations.total_with_birth_day_discount || 0
  }

  return {
    total,
    birthday,
    oldTotal: total !== calculations.total ? calculations.total : undefined
  }
}

export const checkoutDataToOrderAttributes = ({
  checkoutData,
  cartItems
}: {
  checkoutData: CheckoutFormData
  cartItems: CartItemType[]
}): OrdersCalculationRequestAttrs => {
  return {
    products:
      cartItems
        ?.filter(item => !item.extra)
        .map(cartItem => ({
          id: cartItem.product.id,
          quantity: cartItem.count
        })) || [],
    address_id:
      (checkoutData.deliveryMethod?.addressId || 0) > 0
        ? checkoutData.deliveryMethod?.addressId
        : undefined,
    delivery_method_id: checkoutData.deliveryMethod?.typeId,
    promocode: checkoutData.promoCode,
    coins_count:
      (checkoutData.bonusCoinsToUse || 0) > 0
        ? checkoutData.bonusCoinsToUse
        : undefined,
    lat: checkoutData.deliveryMethod?.addressCoords?.lat?.toString(),
    lng: checkoutData.deliveryMethod?.addressCoords?.lng?.toString(),
    additional_products:
      cartItems
        ?.filter(item => item.extra && item.count > 0)
        .map(cartItem => ({
          id: cartItem.product.id,
          quantity: cartItem.count
        })) || []
  }
}
