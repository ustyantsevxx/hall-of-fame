import dayjs from 'dayjs'

const CALENDAR_LOCALES = {
  sameDay: 'HH:mm',
  nextDay: '[завтра в] HH:mm',
  lastDay: '[вчера в] HH:mm',
  lastWeek: 'D MMMM YYYY [в] HH:mm',
  nextWeek: 'D MMMM YYYY [в] HH:mm',
  sameElse: 'D MMMM YYYY [в] HH:mm'
}

export const rawTimeToCalendarString = (raw: string) => {
  return dayjs(raw).calendar(null, CALENDAR_LOCALES)
}
