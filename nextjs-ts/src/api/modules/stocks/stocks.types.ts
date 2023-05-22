import { PaginationMeta } from '../../shared/types'

export type StockShort = {
  id: number
  small_image: string
  big_image: string
  title: string
  short_body: string
}

export type Stock = {
  id: number
  title: string
  body: string | null
  small_image: string
  short_body: string | null
  big_image: string
}

export type StocksPaginatedResponse = {
  data: StockShort[]
  meta: PaginationMeta
}
