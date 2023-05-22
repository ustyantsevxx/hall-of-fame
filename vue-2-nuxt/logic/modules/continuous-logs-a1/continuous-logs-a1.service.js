import dayjs from 'dayjs'
import pluralize from 'pluralize'

import { ContinuousLogsService } from '~/logic/modules/_shared/continuous-logs/continuous-logs.service'
import { secondsToTimeString } from '~/logic/utils/datetime'

class _ContinuousLogsA1Service extends ContinuousLogsService {
  async getTimeValues(date) {
    const { data: utcTimeValues } = await this.axios.get(this.getPath('time'), {
      params: { date }
    })

    return utcTimeValues.map(
      utcTimeValue => utcTimeValue + dayjs().utcOffset() * 60
    )
  }

  getDurationOptions(addMomentary = false) {
    return super.getDurationOptions(
      [1, 6, 24].map(x => ({
        label: pluralize('hour', x, true),
        value: dayjs.duration({ hours: x }).asSeconds()
      })),
      addMomentary
    )
  }

  async getTimeOptions(timestamp) {
    const timeValues = await this.getTimeValues(timestamp)

    return timeValues.map(timeValue => ({
      label: secondsToTimeString(timeValue),
      value: timeValue
    }))
  }

  exportCSV(logId, { variables, date, duration }) {
    return super.exportCSV(`Continuous_log_A1_${logId}`, logId, {
      variables,
      date,
      duration
    })
  }

  async getChartDataToolbarData(log, addMomentary, regular) {
    const durationOptions = this.getDurationOptions(addMomentary, regular)
    const timeOptions = await this.getTimeOptions(log.timestamp)
    const logDateInstance = dayjs.unix(log.timestamp)
    const logDateInstanceStartOfDay = logDateInstance.startOf('day')

    const secondsFromMidnight = logDateInstance.diff(
      logDateInstanceStartOfDay,
      'seconds'
    )

    const initialDurationOption = durationOptions[0]
    const initialTimeOption = timeOptions.find(
      option => option.value === secondsFromMidnight
    )

    return {
      timeOptions,
      durationOptions,
      initialDate: logDateInstanceStartOfDay,
      initialDurationOption,
      initialTimeOption
    }
  }
}

export const ContinuousLogsA1Service = new _ContinuousLogsA1Service(
  'api/v1/continuous-logs-a1'
)
