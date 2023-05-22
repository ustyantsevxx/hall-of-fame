import { BaseApi } from '~/logic/core/BaseApi'
import {
  UserOperationsIndexRequestParams,
  UserOperationsIndexResponse
} from '~/logic/modules/user-operations/user-operations.types'

export class _UserOperationsApi extends BaseApi {
  async getOperations(options: UserOperationsIndexRequestParams) {
    return await this.get<UserOperationsIndexResponse>('index', options)
  }
}
