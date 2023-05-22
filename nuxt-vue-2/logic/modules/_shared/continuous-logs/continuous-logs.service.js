import { BaseService } from '~/logic/core/base.service'
import {
  LOG_REQUEST_TYPES,
  MOMENTARY_DURATION_VALUE
} from '~/logic/modules/_shared/continuous-logs/continuous-logs.constants'
import { downloadLogCSVFile } from '~/logic/utils/export'

export class ContinuousLogsService extends BaseService {
  async getLogs({
    page,
    q,
    order_by,
    order_direction,
    from,
    to,
    msm_serials
  } = {}) {
    const response = await this.axios.get(this.getPath(), {
      params: {
        page: page ?? 1,
        q,
        order_by: order_by ?? 'timestamp',
        from,
        to,
        order_direction: order_direction ?? 'desc',
        msm_serials
      }
    })
    return response?.data
  }

  async getLog(logId) {
    const { data } = await this.axios.get(this.getPath(logId))
    return data
  }

  getChartDataRequestOptions({ variables, date, duration }) {
    return duration === MOMENTARY_DURATION_VALUE
      ? { type: LOG_REQUEST_TYPES.MOMENTARY, date }
      : { type: LOG_REQUEST_TYPES.BASIC, data: variables, date, duration }
  }

  async getChartData({ logId, variables, params: { duration, date } }) {
    const options = this.getChartDataRequestOptions({
      variables,
      date,
      duration
    })
    const { data } = await this.axios.post(this.getPath(logId), options)
    return data.data
  }

  async getFilters(logId) {
    const response = await this.axios.get(this.getPath(logId, 'filters'))
    return response?.data
  }

  getDurationOptions(options, addMomentary) {
    const result = [...options]
    if (addMomentary) {
      result.push({ label: 'Momentary', value: MOMENTARY_DURATION_VALUE })
    }
    return result
  }

  async exportCSV(filename, logId, { variables, date, duration }) {
    const options = this.getChartDataRequestOptions({
      variables,
      date,
      duration
    })
    const response = await this.axios.post(
      this.getPath(logId, 'export'),
      options
    )
    downloadLogCSVFile(filename, response.data)
  }

  async getExtremes({ logId, variables, params: { duration, date } }) {
    const options = this.getChartDataRequestOptions({
      variables,
      date,
      duration
    })
    const { data } = await this.axios.post(
      this.getPath(logId, 'extremes'),
      options
    )
    return data.data
  }
}
