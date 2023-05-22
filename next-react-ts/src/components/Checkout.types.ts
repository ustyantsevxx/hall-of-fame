import { OrdersCalculationResponse } from '../api/modules/orders/orders.types'
import { AddressFormData } from './AddressForm.types'

export type CheckoutFormData = {
  personalInfo?: {
    name?: string
    phone?: string
  }
  deliveryMethod?: {
    typeId?: number
    addressId?: number
    restaurantId?: number
    newAddress?: AddressFormData
    addressCoords?: {
      lat?: number
      lng?: number
    }
  }
  deliveryTime?: {
    typeId?: number
    exactTime?: string
  }
  paymentMethod?: {
    typeId?: number
    changeBanknote?: number | null
  }
  withoutBirthdayProduct?: boolean
  bonusCoinsToUse?: number
  promoCode?: string
  comment?: string
}

export type CheckoutContextType = {
  loading?: boolean
  calculations?: OrdersCalculationResponse
  refetchCalculations?: () => Promise<any>
  refetchError?: boolean
}
