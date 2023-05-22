import { ComponentPublicInstance } from 'vue'

export type CalendarExpose = {
  move: (date: Date | number | string) => Promise<void>
  focusDate: (date: Date | string) => Promise<void>
}

export type CalendarComponent = ComponentPublicInstance & CalendarExpose
