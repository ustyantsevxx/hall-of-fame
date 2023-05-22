import { Timer } from '@/api/modules/timers/types'

export type TaskFormData = {
  owner: Timer
  name: string
  finishDateTime: Date | null
  notificationDateTime: Date | null
  favorite?: boolean
  completed?: boolean
}

export type TaskFormSlotContent = {
  owner: Timer | null
  name: string
  setName: (name: string) => void
}
