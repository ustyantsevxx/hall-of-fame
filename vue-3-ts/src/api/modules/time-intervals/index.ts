import { TimeIntervalIndexResponse } from '@/api/modules/time-intervals/types'
import { MetaPaginationParams } from '@/api/shared/types'
import { Service } from '@/core/Service'

class _TimeIntervalsService extends Service {
  async getTimerIntervals({
    timerId,
    date,
    page,
    perPage
  }: MetaPaginationParams & { timerId: string; date?: Date }) {
    return this.axios.get<TimeIntervalIndexResponse>(this.e('index'), {
      data: {
        timer_id: timerId,
        date,
        page,
        per_page: perPage
      }
    })
  }
}

export const TimeIntervalsService = new _TimeIntervalsService(
  'api/v1/time_intervals'
)
