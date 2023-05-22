export const BONUS_CARD_TYPES = {
  DISCOUNT: 1,
  BONUS: 2
}

export const LEGAL_BONUS_CARD_TYPES = {
  LITER: 1,
  RUBLE: 2,
  RUBLES_WITH_FIX_PRICE: 3,
  LITER_WITH_CREDIT: 4,
  LITER_WITH_CREDIT_AND_FIX_PRICE: 5,
  LITER_WALLET: 6,
  RUBLE_CASHLESS: 7,
  RUBLE_CASHLESS_WITH_FIX_PRICE: 8
}

export const BONUS_CARD_TYPE_NAMES = {
  [BONUS_CARD_TYPES.BONUS]: 'Бонусная',
  [BONUS_CARD_TYPES.DISCOUNT]: 'Скидочная'
}

export const LEGAL_BONUS_CARD_RUBLE_TYPES = [
  LEGAL_BONUS_CARD_TYPES.RUBLE,
  LEGAL_BONUS_CARD_TYPES.RUBLE_CASHLESS,
  LEGAL_BONUS_CARD_TYPES.RUBLE_CASHLESS_WITH_FIX_PRICE,
  LEGAL_BONUS_CARD_TYPES.RUBLES_WITH_FIX_PRICE
]

export const LEGAL_BONUS_CARDS_CASHLESS_TYPES = [
  LEGAL_BONUS_CARD_TYPES.RUBLE_CASHLESS,
  LEGAL_BONUS_CARD_TYPES.RUBLE_CASHLESS_WITH_FIX_PRICE
]

export const LEGAL_BONUS_CARD_LITER_TYPES = [
  LEGAL_BONUS_CARD_TYPES.LITER,
  LEGAL_BONUS_CARD_TYPES.LITER_WALLET,
  LEGAL_BONUS_CARD_TYPES.LITER_WITH_CREDIT,
  LEGAL_BONUS_CARD_TYPES.LITER_WITH_CREDIT_AND_FIX_PRICE
]

export const BONUS_CARD_BONUS_STATUSES = {
  NO: 0,
  BRONZE: 1,
  SILVER: 2,
  GOLDEN: 3
}

export const BONUS_CARD_BONUS_STATUS_NAMES = {
  [BONUS_CARD_BONUS_STATUSES.BRONZE]: 'Бронзовый статус',
  [BONUS_CARD_BONUS_STATUSES.SILVER]: 'Серебряный статус',
  [BONUS_CARD_BONUS_STATUSES.GOLDEN]: 'Золотой статус'
}

export const BONUS_CARD_STATUSES = {
  ACTIVE: 1,
  BLOCKED: 2
}

export const BONUS_CARD_STATUS_NAMES = {
  [BONUS_CARD_STATUSES.ACTIVE]: 'В работе',
  [BONUS_CARD_STATUSES.BLOCKED]: 'Черный список'
}

export const BONUS_CARD_LIMIT_TYPES = {
  NO_LIMIT: 0,
  DAILY: 1,
  MONTHLY: 2
}

export const BONUS_CARD_LIMIT_TYPES_NAMES = {
  [BONUS_CARD_LIMIT_TYPES.NO_LIMIT]: 'Нет',
  [BONUS_CARD_LIMIT_TYPES.DAILY]: 'Суточный',
  [BONUS_CARD_LIMIT_TYPES.MONTHLY]: 'Месячный'
}

export const BONUS_CARD_NAME_MAX_LENGTH = 100
export const BONUS_CARD_STATUS_COMMENT_MAX_LENGTH = 100
