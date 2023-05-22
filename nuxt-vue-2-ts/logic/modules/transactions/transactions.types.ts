import { MetaPagination } from '~/logic/types/api-meta'
import { IDateRange } from '~/logic/types/dates'

export interface TransactionBonusCard {
  id?: number
  type?: {
    id?: number
    name?: string
    name_translate?: string
  }
  number?: string
}

export interface TransactionFuelType {
  id?: number
  name?: string
}

export interface TransactionStation {
  id?: number
  name?: string
  address?: string
}

export interface TransactionType {
  id?: number
  name?: string
  name_translate?: string
}

export interface Transaction {
  id?: number
  type?: TransactionType
  amount?: number
  price?: number
  total_price?: number
  weight: number
  discount?: {
    value?: number
    price?: number
  }
  bonus?: {
    coefficient?: number
    credit?: number
    debit?: number
    value?: number
  }
  description?: string | null
  fuel_type?: TransactionFuelType
  created_at?: number
  bonus_card?: TransactionBonusCard
  station?: TransactionStation
}

export interface TransactionsDiscountStatistics {
  type_id?: number
  fuel_type_id?: number | null
  name?: string
  discount_price?: number
}

export interface TransactionsBonusesStatistics {
  type_id?: number
  fuel_type_id?: number | null
  name?: string
  bonus_credit?: number
}

export interface TransactionsExpensesStatistics {
  type_id?: number
  fuel_type_id?: number | null
  name?: string
  total_price?: number
}

export interface TransactionsLitersStatistics {
  type_id?: number
  fuel_type_id?: number | null
  name?: string
  amount?: number
}

export interface TransactionsIndexResponse {
  data: Transaction[]
  meta: MetaPagination
}

export interface TransactionsStatisticsResponse {
  expenses?: TransactionsExpensesStatistics[]
  liters?: TransactionsLitersStatistics[]
  bonuses?: TransactionsBonusesStatistics[]
  discount?: TransactionsDiscountStatistics[]
  total?: {
    expenses?: number
    liters?: number
    bonuses?: number
    discount?: number
  }
}

export interface TransactionsIndexRequestParams {
  page?: number
  per_page?: number
  bonus_card_id?: number
  start_at?: string
  end_at?: string
  archived?: number
}

export interface TransactionsStatisticsRequestParams {
  bonus_card_id?: number
  start_at?: string
  end_at?: string
  archived?: number
}

export interface TransactionReportRequestParams {
  bonus_card_id?: number
  start_at?: string
  end_at?: string
  archived?: number
}

export interface TransactionsReportRequestOptions {
  bonusCardId?: number
  dateRange: IDateRange
  archived?: boolean
}

export type AnyTransactionStatistics =
  | TransactionsBonusesStatistics
  | TransactionsLitersStatistics
  | TransactionsExpensesStatistics

export interface TransactionStatisticsOptions {
  bonusCardId: number | undefined
  dateRange: IDateRange
  archived?: boolean
}

export interface TransactionStatisticEntry {
  name?: string
  value?: number
  color?: any
}

export interface TransactionStatisticsItem {
  data: TransactionStatisticEntry[] | undefined
  total: number | undefined
}

export interface TransactionStatistics {
  expenses: TransactionStatisticsItem
  liters: TransactionStatisticsItem
  bonuses: TransactionStatisticsItem
  discount: TransactionStatisticsItem
}

export interface TransactionsRequestOptions {
  page?: number
  archived?: boolean
  bonusCardId?: number
  dateRange?: IDateRange
}
