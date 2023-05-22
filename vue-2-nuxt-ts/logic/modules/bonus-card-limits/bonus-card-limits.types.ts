export interface BonusCardLimitsType {
  id: number
  name: string
  name_translate: string
}

export interface BonusCardLimitsStoreLimitParam {
  limit_type_id: number
  fuel_type_id: number
  limit: number
}

export interface BonusCardLimitsStoreRequestParams {
  bonus_card_ids: number[]
  limits: BonusCardLimitsStoreLimitParam[]
}

export interface BonusCardLimitsUpdateBalanceRequestParam {
  fuel_type_id: number
  amount: number
  is_top_up: boolean
}

export interface BonusCardLimitsUpdateBalanceRequestParams {
  bonus_card_ids: number[]
  balances: BonusCardLimitsUpdateBalanceRequestParam[]
}

export interface BonusCardLimitsDeleteRequestParams {
  bonus_card_ids: number[]
  fuel_type_ids: number[]
}
