import { MetaPagination } from '@/api/shared/types'

export type Habit = {
  id: string
  name: string
  color: string
  icon: string
  type_id: number
  ending_type_id: number
  repeat_type_id: number
  repeating: number[]
  notification_time: number[]
  current_goal?: number
  end_date?: number | string | null
  deleted_at?: number | null
  updated_at?: number
  created_at?: number
}

export type HabitsIndexResponse = {
  items: Habit[]
  meta: MetaPagination
}

export type NewHabitData = {
  id: string
  name: string
  color: string
  icon: string
  type_id: number
  ending_type_id: number
  repeat_type_id: number
  repeating: number[]
  notification_time: number[]
  current_goal?: number
  end_date?: number
}
