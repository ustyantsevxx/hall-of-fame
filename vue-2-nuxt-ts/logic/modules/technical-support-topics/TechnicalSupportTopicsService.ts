import { BaseService } from '~/logic/core/BaseService'
import { _TechnicalSupportTopicsApi } from '~/logic/modules/technical-support-topics/TechnicalSupportTopicsApi'

export class _TechnicalSupportTopicsService extends BaseService<_TechnicalSupportTopicsApi> {
  async getAllTopics() {
    const { data } = await this.api.getAll()
    return data
  }
}
