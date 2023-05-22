import { BaseApi } from '~/logic/core/BaseApi'

export class BaseService<ApiType extends BaseApi> {
  api: ApiType

  constructor(api: ApiType) {
    this.api = api
  }
}
