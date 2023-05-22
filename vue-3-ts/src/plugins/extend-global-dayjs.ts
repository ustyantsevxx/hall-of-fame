import dayjs from 'dayjs'
import ru from 'dayjs/locale/ru'
import calendar from 'dayjs/plugin/calendar'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import isToday from 'dayjs/plugin/isToday'
import isTomorrow from 'dayjs/plugin/isTomorrow'
import localeData from 'dayjs/plugin/localeData'
import weekday from 'dayjs/plugin/weekday'
import weekOfYear from 'dayjs/plugin/weekOfYear'

/** Call this function, then import global dayjs from 'dayjs' module */
export const extendGlobalDayjs = () => {
  dayjs.locale(ru)
  dayjs.extend(customParseFormat)
  dayjs.extend(duration)
  dayjs.extend(weekday)
  dayjs.extend(weekOfYear)
  dayjs.extend(localeData)
  dayjs.extend(isToday)
  dayjs.extend(isTomorrow)
  dayjs.extend(calendar)
  dayjs().localeData()
}
