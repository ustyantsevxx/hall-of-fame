import { Timer } from '@/api/modules/timers/types'

export type Task = {
  id: string
  name: string
  owner: Timer
  finishDateTime: Date | null
  notificationDateTime: Date | null
  completed: boolean
  favorite: boolean
}
