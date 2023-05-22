import { BaseService } from '~/logic/core/base.service'
import { ALARM_STATUS_KEYS } from '~/logic/modules/alarms/alarms.constants'
import { downloadLogCSVFile } from '~/logic/utils/export'

class _AlarmsService extends BaseService {
  async getAlarms({
    page,
    q,
    order_by,
    show_archived,
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
        show_archived: show_archived ? 1 : 0,
        msm_serials
      }
    })
    return response?.data
  }

  async getAlarm(alarmId) {
    const { data } = await this.axios.get(this.getPath(alarmId))
    return data
  }

  async getChartData({ alarmId, variables }) {
    const { data } = await this.axios.post(this.getPath(alarmId), {
      data: variables
    })

    return data.data
  }

  async archiveAlarm(alarmId) {
    const { data } = await this.axios.post(this.getPath(alarmId, 'archive'))

    return { updatedAlarm: data }
  }

  async closeAlarm(alarmId) {
    const { data } = await this.axios.post(this.getPath(alarmId, 'close'))
    return { updatedAlarm: data }
  }

  async getFilters(alarmId) {
    const response = await this.axios.get(this.getPath(alarmId, 'filters'))
    return response?.data
  }

  async exportCSV(alarmId, variables) {
    const response = await this.axios.post(this.getPath(alarmId, 'export'), {
      data: variables
    })

    downloadLogCSVFile(`Alarm_log_${alarmId}`, response.data)
  }

  ifAlarmClosedOrArchived(alarm) {
    return [ALARM_STATUS_KEYS.CLOSED, ALARM_STATUS_KEYS.ARCHIVED].includes(
      alarm.status
    )
  }
}

export const AlarmsService = new _AlarmsService('api/v1/alarms')
