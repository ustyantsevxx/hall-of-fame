import { BaseService } from '~/logic/core/base.service'

class _BadgesService extends BaseService {
  async getCounters() {
    const response = await this.axios.get(this.getPath())
    return response?.data
  }
}

export const BadgesService = new _BadgesService('api/v1/badges')
