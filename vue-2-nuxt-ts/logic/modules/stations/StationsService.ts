import { BaseService } from '~/logic/core/BaseService'
import { _StationsApi } from '~/logic/modules/stations/StationsApi'

import { StationsRequestOptions } from '.'

export class _StationsService extends BaseService<_StationsApi> {
  async getStations(options: StationsRequestOptions = {}) {
    const response = await this.api.getAll({
      stock_id: options.articleId
    })

    if (response.status === 200) {
      return response.data
    }
  }
}
