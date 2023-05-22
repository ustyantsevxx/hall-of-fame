export type CalendarProgressDay = {
  raw: Date
  progress: number
  status: CalendarProgressDayStatus
}

export enum CalendarProgressDayStatus {
  Regular = 0,
  InProgress = 1,
  Missed = 2,
  Planned = 3
}

export type CalendarProgressSuccessRange = {
  dates: {
    start: Date
    end: Date
  }
}
