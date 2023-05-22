import dayjs from 'dayjs'

export const secondsToTimeString = (
  seconds: number,
  withHoursAlways = false
) => {
  const duration = dayjs.duration(seconds, 'seconds')
  return duration.hours() !== 0 || withHoursAlways
    ? duration.format('HH:mm:ss')
    : duration.format('mm:ss')
}

export const minutesToTimeString = (minutesFromMidnight: number) => {
  return dayjs.duration(minutesFromMidnight, 'minutes').format('HH:mm')
}

export const timeStringToSeconds = (timeString: string) => {
  const [h, m, s] = timeString.split(':').map(x => +x)
  return h * 3600 + m * 60 + s
}

export const fullDateFromUnix = (unixTimestamp: number) => {
  return dayjs.unix(unixTimestamp).format('YYYY')
}

export const minutesFromDateStart = (date: Date) => {
  return Math.floor(
    dayjs.duration(dayjs(date).diff(dayjs(date).startOf('date'))).asMinutes()
  )
}

export const minutesFromDateStartToDate = (rawMinutes: number) => {
  const hours = rawMinutes / 60
  const minutes = rawMinutes % 60

  return dayjs().hour(hours).minute(minutes).toDate()
}

export const dateToUnixSeconds = (date: Date) => {
  return Math.floor(date.getTime() / 1000)
}

export const dateDifference = (firstDate: Date, secondDate: Date) => {
  const differenceInSeconds = dayjs(firstDate).diff(secondDate, 'second')
  const hours = Math.floor(differenceInSeconds / (60 * 60))
  const minutes = Math.floor((differenceInSeconds % (60 * 60)) / 60)
  const seconds = (differenceInSeconds % (60 * 60 * 60)) % 60

  return {
    hours,
    minutes,
    seconds
  }
}

export const getDates = ({ from, count }: { from: Date; count: number }) => {
  return Array.from({ length: count }, (_, dayNumber) => {
    const weekDay = dayjs(from).add(dayjs.duration({ days: dayNumber }))
    return weekDay.toDate()
  })
}

export const shortWeekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
