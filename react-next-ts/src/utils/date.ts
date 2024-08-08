import dayjs from 'dayjs'

const CALENDAR_LOCALES = {
  sameDay: 'HH:mm',
  nextDay: '[xx xx] HH:mm',
  lastDay: '[xx xx] HH:mm',
  lastWeek: 'D MMMM YYYY [xx] HH:mm',
  nextWeek: 'D MMMM YYYY [xx] HH:mm',
  sameElse: 'D MMMM YYYY [xx] HH:mm'
}

export const rawTimeToCalendarString = (raw: string) => {
  return dayjs(raw).calendar(null, CALENDAR_LOCALES)
}
