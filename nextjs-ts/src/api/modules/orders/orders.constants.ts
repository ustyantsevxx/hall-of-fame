import { OrderActions } from './orders.types'

export const ORDER_STATUS = {
  REQUEST_PROCESSING: 1,
  COOKING: 2,
  DELIVERING: 3,
  DELIVERED: 4,
  CANCELED: 5,
  READY_TO_PICKUP: 6
}

export const ORDER_CANCELABLE_STATUS_IDS = [
  ORDER_STATUS.REQUEST_PROCESSING,
  ORDER_STATUS.COOKING,
  ORDER_STATUS.DELIVERING
]

export const ORDERED_STATUS_IDS = [
  ORDER_STATUS.REQUEST_PROCESSING,
  ORDER_STATUS.COOKING,
  ORDER_STATUS.DELIVERING,
  ORDER_STATUS.DELIVERED,
  ORDER_STATUS.CANCELED,
  ORDER_STATUS.READY_TO_PICKUP
]

export const ORDER_STATUS_NAMES = {
  [ORDER_STATUS.REQUEST_PROCESSING]: 'Принят',
  [ORDER_STATUS.COOKING]: 'Готовят',
  [ORDER_STATUS.DELIVERING]: 'У курьера',
  [ORDER_STATUS.DELIVERED]: 'Доставлен',
  [ORDER_STATUS.CANCELED]: 'Отменен',
  [ORDER_STATUS.READY_TO_PICKUP]: 'Готов к выдаче'
}

export const ORDER_STATUS_NAMES_PASSED = {
  [ORDER_STATUS.REQUEST_PROCESSING]: 'Принят',
  [ORDER_STATUS.COOKING]: 'Готовят',
  [ORDER_STATUS.DELIVERING]: 'Доставлен',
  [ORDER_STATUS.READY_TO_PICKUP]: 'Готов к выдаче'
}

export const ORDER_STATUS_DESCRIPTION = {
  [ORDER_STATUS.REQUEST_PROCESSING]: 'Ждём подтверждение заказа'
}

export const ORDER_STATUS_ACTIONS = {
  [ORDER_STATUS.CANCELED]: [OrderActions.REPEAT],
  [ORDER_STATUS.REQUEST_PROCESSING]: [OrderActions.REPEAT, OrderActions.CANCEL],
  [ORDER_STATUS.COOKING]: [OrderActions.REPEAT, OrderActions.CANCEL],
  [ORDER_STATUS.DELIVERING]: [OrderActions.REPEAT, OrderActions.CANCEL],
  [ORDER_STATUS.DELIVERED]: [
    OrderActions.REPEAT
    // TODO добавить когда будут реализованы отзывы
    // OrderActions.RATE
  ],
  [ORDER_STATUS.READY_TO_PICKUP]: [
    OrderActions.REPEAT
    // TODO добавить когда будут реализованы отзывы
    // OrderActions.RATE
  ]
}

export const NEED_SHOW_ORDER_WITH_ID_KEY = 'success_order_id'

export const PROMOCODE_COOKIES_KEY = 'pc'
export const BIRTHDAY_COOKIES_KEY = 'birthday_canceled'
