import dayjs from 'dayjs'
import pluralize from 'pluralize'

import { ContinuousLogsService } from '~/logic/modules/_shared/continuous-logs/continuous-logs.service'

class _ContinuousLogsA2Service extends ContinuousLogsService {
  getDurationOptions(addMomentary = false) {
    return super.getDurationOptions(
      [14, 30, 45, 60].map(x => ({
        label: pluralize('day', x, true),
        value: dayjs.duration({ days: x }).asSeconds()
      })),
      addMomentary
    )
  }

  exportCSV(logId, { variables, date, duration }) {
    return super.exportCSV(`Continuous_log_A2_${logId}`, logId, {
      variables,
      date,
      duration
    })
  }

  getChartDataToolbarData(log, addMomentary) {
    const durationOptions = this.getDurationOptions(addMomentary)
    const logDateInstanceStartOfDay = dayjs.unix(log.timestamp).startOf('day')

    return {
      durationOptions,
      initialDate: logDateInstanceStartOfDay,
      initialDurationOption: durationOptions[0]
    }
  }
}

export const ContinuousLogsA2Service = new _ContinuousLogsA2Service(
  'api/v1/continuous-logs-a2'
)
