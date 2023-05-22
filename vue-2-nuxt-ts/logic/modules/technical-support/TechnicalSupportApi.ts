import { BaseApi } from '~/logic/core/BaseApi'

import {
  Request,
  RequestsRequestParams,
  RequestsResponse,
  StoreRequestPayload
} from '.'

export class _TechnicalSupportApi extends BaseApi {
  getRequests(options: RequestsRequestParams) {
    return this.get<RequestsResponse>('index', options)
  }

  getById(id: number) {
    return this.get<any>('show', {
      id
    })
  }

  createRequest(options: StoreRequestPayload) {
    return this.post<Request>('store', options)
  }
}
