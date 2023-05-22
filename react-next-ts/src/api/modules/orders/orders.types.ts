import { PaginationMeta } from '../../shared/types'
import { DeliveryAddress } from '../addresses/addresses.types'
import { DeliveryMethod } from '../delivery-methods/delivery-methods.types'
import { DeliveryPolygon } from '../delivery-polygons/delivery-polygons.types'
import { PaymentMethod } from '../payment-methods/payment-methods.types'
import { Product } from '../products/products.types'
import { Restaurant } from '../restaurants/restaurants.types'

export type OrderProduct = {
  id: number
  name: string
  description: string
  quantity: number
  price: number
  sale_price: number
  image: string
}

export type OrderStatus = {
  id: number
  name: string
  color: string
}

export type Order = {
  id: number
  status: OrderStatus
  products: OrderProduct[]
  order_price: number
  created_at: string
  delivery_time: string | null
  delivery_method: DeliveryMethod
  payment_method: PaymentMethod
  address: DeliveryAddress
  restraunt: Restaurant
}

export type NewOrderProduct = {
  id: number
  quantity: number
}

export type NewOrderAttributes = {
  products: NewOrderProduct[]
  additional_products: NewOrderProduct[]
  delivery_method_id: number
  payment_method_id: number
  address_id?: number
  restraunt_id?: number
  comment: string
  promocode?: string
  coins_count?: number
  change_banknote?: number
  delivery_time?: string
  num_persons: number
  without_birth_day?: boolean
}

export type CreateOrderResponse = {
  id: number
  acquiring: {
    bank_order_id: string
    payment_url: string
    bank: string
  }
  price: number
}

export type OrdersPaginatedResponse = {
  data: Order[]
  meta: PaginationMeta
}

export type OrderStatusResponse = {
  id: number
  status: OrderStatus
}

export enum OrderActions {
  CANCEL,
  REPEAT,
  RATE
}

export type OrdersCalculationRequestAttrs = {
  delivery_method_id?: number
  email?: string
  address_id?: number
  products: NewOrderProduct[]
  additional_products: NewOrderProduct[]
  promocode?: string
  coins_count?: number
  lat?: string
  lng?: string
}

export type OrderDeliveryTime = {
  min: string
  max: string
}

export type OrderPreorderPeriod = {
  date: string
  periods: OrderDeliveryTime[]
}

export type OrdersCalculationResponse = {
  total?: number
  additional_products?: number[]
  additional_products_sum?: number
  coins_added?: boolean
  coins_sub: boolean
  max_coins_sub_count: number
  promocode_used: boolean
  total_with_promocode?: number
  total_with_coins?: number
  total_with_additional_products: number
  total_with_birth_day_discount?: number
  birth_day_discount?: number
  birth_day_product_id?: number
  promocode_discount?: number
  coins_count_delivery?: number
  coins_count_self_delivery?: number
  promocode_product_ids?: number[]
  delivery_polygon?: DeliveryPolygon
  preorder_periods: OrderPreorderPeriod[]
}

export type OrderAdditionalProductsResponseItem = {
  product: Product
  free_count: number
  item_price: number
}
