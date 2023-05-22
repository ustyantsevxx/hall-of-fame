import { MetaPagination } from '@/api/shared/types'

export type TimeInterval = {
  id: string
  start_time: number
  end_time?: number
  mood?: number
  state_id?: number
  comment?: string
  updated_at?: number
  deleted_at?: number
}

export type TimeIntervalIndexResponse = {
  items: TimeInterval[]
  meta: MetaPagination
}
