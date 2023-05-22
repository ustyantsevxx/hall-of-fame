import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import localeData from 'dayjs/plugin/localeData'

dayjs.extend(localeData)
dayjs.extend(customParseFormat)
dayjs.extend(duration)
dayjs().localeData()
