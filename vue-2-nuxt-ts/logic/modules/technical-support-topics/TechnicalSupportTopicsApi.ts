import { BaseApi } from '~/logic/core/BaseApi'

import { Topic } from '.'

export class _TechnicalSupportTopicsApi extends BaseApi {
  getAll() {
    return this.get<Topic[]>('all')
  }
}
