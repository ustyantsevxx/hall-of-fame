export type ApiTask = {
  id: string
  name: string
  owner_id: string | null
  finish_datetime: number
  notification_datetime: number | null
  deleted_at: number | null
  completed: boolean
  favorite: boolean
}

export type ApiTaskData = {
  id: string
  name: string
  completed: boolean
  finish_datetime: number
  notification_datetime?: number
  owner_id: string
}
