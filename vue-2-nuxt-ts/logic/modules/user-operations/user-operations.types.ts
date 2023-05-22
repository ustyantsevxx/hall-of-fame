import { MetaPagination } from '~/logic/types/api-meta'
import { IDateRange } from '~/logic/types/dates'

export interface UserOperationsIndexRequestParams {
  page?: number
  per_page?: number
  is_debit?: number | null
  start_at?: string
  end_at?: string
}

export interface UserOperationsRequestOptions {
  page?: number | undefined
  isDebit?: boolean | undefined
  dateRange?: IDateRange
}

export interface UserOperation {
  id?: number
  number: string
  comment: string | null
  amount: number
  is_debit: boolean
  date: number
}

export interface UserOperationsIndexResponse {
  operations: {
    data: UserOperation[]
    meta: MetaPagination
  }
  total: number
}
