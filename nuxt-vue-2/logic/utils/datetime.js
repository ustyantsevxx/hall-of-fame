import dayjs from 'dayjs'

export const secondsToTimeString = seconds => {
  const duration = dayjs.duration(seconds * 1000)
  return duration.hours() !== 0
    ? duration.format('HH:mm:ss')
    : duration.format('mm:ss')
}

export const timeStringToSeconds = timeString => {
  const [h, m, s] = timeString.split(':').map(x => +x)
  return h * 3600 + m * 60 + s
}
