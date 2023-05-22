import { User } from '~/logic/modules/users'

export interface BonusCardLimitBonusCard {
  id?: number
}

export interface BonusCardLimitFuelType {
  id?: number
  name?: string
}

export interface BonusCardFuelLimit {
  fuel_type?: BonusCardLimitFuelType
  bonus_coefficient?: number | null
  discount?: number | null
  day_limit?: number | null
  limit?: number | null
  end_at?: number | null
}

export interface BonusCardLimitProductGroup {
  id?: number
  name?: string
}

export interface IBonusCardProductLimit {
  product_group?: BonusCardLimitProductGroup
  bonus_coefficient?: number | null
  discount?: number | null
  day_limit?: number | null
  limit?: number | null
  end_at?: number | null
}

export interface BonusCardLimit {
  bonus_card: BonusCardLimitBonusCard
  fuel_type_limits: BonusCardFuelLimit[]
  product_group_limits: IBonusCardProductLimit[]
}

export interface BonusCardLimitRequestParams {
  bonus_card_id: number
}

export interface BonusCardUpdateRequestParams {
  bonus_card_id: number
  owner: string | null
  pin: number | null
  pin_confirmation: number | null
}

export interface BonusCardsUpdateStatusRequestParams {
  bonus_card_ids: number[]
  status_id: number
  status_comment?: string | null
}

export interface BonusCardsUpdateBalanceRequestParams {
  bonus_card_ids: number[]
  amount: number
  is_top_up: boolean
}

export interface BonusCardsUpdateRubleCardLimitRequestParams {
  bonus_card_ids: number[]
  limit_rubles: number
  limit_type_id: number
}

export interface BonusCardStatus {
  id?: number
  comment: string
  name: string
  name_translate: string
}

export interface BonusCardStatusTypeOption {
  id?: number
  name: string
}

export interface BonusCardType {
  id?: number
  name?: string
  name_translate?: string
}

export interface BonusCardLimitType {
  id?: number
  name?: string
  name_translate?: string
}

export interface BonusCardLegalLimit {
  fuel_type?: BonusCardLimitFuelType
  limit?: number
  type: BonusCardLimitType
  balance: number | null
}

export interface BonusCard {
  id?: number
  type?: BonusCardType
  number?: string
  discount?: {
    value?: number
  }
  bonus?: {
    value?: number
    status?: {
      id?: number
      name?: string
      name_translate?: string
    }
  }
  owner: string
  balance: number
  pin?: number
  status?: BonusCardStatus
  card_limits?: BonusCardLegalLimit[]
}

export interface BonusCardsUpdateBalanceResponse {
  user: User
  bonus_cards: BonusCard[]
}
