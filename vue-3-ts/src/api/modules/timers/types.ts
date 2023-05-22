import { MetaPagination } from '@/api/shared/types'

export type Timer = {
  id: string
  name: string
  icon: string
  color: string
  index: number
  is_notify_set: boolean
  is_goal_set: boolean
  notify_time: number
  goal_time: number
  parent_type_id: number
  parent_id: string | null
  created_at?: number
  updated_at?: number
  deleted_at?: number | null
}

export type TimersIndexResponse = {
  items: Timer[]
  meta: MetaPagination
}

export type NewTimerData = {
  id: string
  name: string
  icon: string
  color: string
  index: number
  is_notify_set: boolean
  is_goal_set: boolean
  notify_time?: number
  goal_time?: number
  parent_type_id: number
  parent_id?: string
}
