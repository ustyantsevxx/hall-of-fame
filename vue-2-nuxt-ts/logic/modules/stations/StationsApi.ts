import { BaseApi } from '~/logic/core/BaseApi'

import { Station, StationsAllRequestParams } from '.'

export class _StationsApi extends BaseApi {
  getAll(options: StationsAllRequestParams) {
    return this.get<Station[]>('all', options)
  }
}
