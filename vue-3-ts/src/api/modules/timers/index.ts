import {
  NewTimerData,
  Timer,
  TimersIndexResponse
} from '@/api/modules/timers/types'
import { Service } from '@/core/Service'

class _TimersService extends Service {
  async getTimers(): Promise<Timer[]> {
    const { data } = await this.axios.get<TimersIndexResponse>(this.e('index'))
    // TODO: remove filter when filtered on backend
    return data.items.filter(timer => !timer.deleted_at)
  }

  async createTimer(newTimerData: NewTimerData) {
    await this.axios.post(this.e('store'), newTimerData)
  }

  async updateTimer(newTimerData: NewTimerData) {
    await this.axios.put(this.e('update'), newTimerData)
  }

  async deleteTimer(timerId: string) {
    await this.axios.delete(this.e('delete'), {
      params: { id: timerId }
    })
  }
}

export const TimersService = new _TimersService('api/v1/timers')
