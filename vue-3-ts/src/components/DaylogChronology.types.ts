import { Habit } from '@/api/modules/habits/types'
import { Timer } from '@/api/modules/timers/types'

export enum ChronologySectionType {
  TimerTimeInterval,
  HabitSection,
  Fake
}

export type ChronologySection = {
  id: string
  type: ChronologySectionType
  startDatetime: Date
  endDatetime: Date
  editable: boolean
}

export type ChronologySectionMeta = {
  canAddAfter: boolean
  canAddBefore: boolean
  first: boolean
  last: boolean
  nextSection?: ChronologySection
  previousSection?: ChronologySection
}

export type ChronologySectionWithMeta = ChronologySection & {
  meta: ChronologySectionMeta
}

export type ChronologyTimerSection = ChronologySection & {
  owner?: Timer
  mood?: number
  comment?: string
}

export type ChronologyHabitSection = ChronologySection & {
  owner?: Habit
  value?: number
}

export enum DaylogChronologySectionMode {
  Default,
  AddAfter,
  Edit
}

export type DaylogChronologyTimerFormData = {
  id: string | null
  startTime: number
  endTime: number
  owner: Timer | null
  mood: number | null
  comment: string
}

export type DaylogItem = {
  id: string
  timer_id?: string | null
  habit_id?: string | null
  start_time?: number | null
  end_time?: number | null
  date?: number
  mood?: number | null
  comment?: string | null
  value?: number | null
}

export const DRAWER_OPENED_SECTION_MODES = [DaylogChronologySectionMode.Edit]
export const ACTION_FORM_VISIBLE_SECTION_MODES = [
  DaylogChronologySectionMode.AddAfter
]
