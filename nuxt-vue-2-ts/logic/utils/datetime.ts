import 'dayjs/locale/ru'

import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import utc from 'dayjs/plugin/utc'

dayjs.locale('ru')
dayjs.extend(duration)
dayjs.extend(utc)

/**
 * Always use this extended version of dayjs
 */
export const xDayjs = dayjs

export const secondsToTimeString = (seconds: number): string => {
  const duration = dayjs.duration(seconds * 1000)
  return duration.hours() !== 0
    ? duration.format('HH:mm:ss')
    : duration.format('mm:ss')
}

export const fullDateFromUnix = (unixTimestamp: number) => {
  return dayjs.unix(unixTimestamp).format('DD MMMM YYYY')
}
