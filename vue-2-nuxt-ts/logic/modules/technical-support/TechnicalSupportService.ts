import { BaseService } from '~/logic/core/BaseService'
import { _TechnicalSupportApi } from '~/logic/modules/technical-support/TechnicalSupportApi'

import { ShortRequest } from '.'

export interface GetMyRequestsOptionsType {
  page: number
}

export interface CreateRequestOptions {
  message: string
  stationId?: number
  fileIds?: number[]
  topic_id?: number
  topic_name?: string
}

export class _TechnicalSupportService extends BaseService<_TechnicalSupportApi> {
  indexRequestsPerPage = 9

  getLastMessageSender(request: ShortRequest) {
    return request.unread_message_count > 0 ? 'xx' : 'xx'
  }

  async getMyRequests({ page }: GetMyRequestsOptionsType) {
    const { data } = await this.api.getRequests({
      page,
      per_page: this.indexRequestsPerPage
    })
    return data
  }

  async getRequestById(id: number) {
    const { data } = await this.api.getById(id)
    return data
  }

  async createRequest(options: CreateRequestOptions) {
    const { data, status } = await this.api.createRequest({
      message: options.message === '' ? undefined : options.message,
      station_id: options.stationId,
      temporary_file_ids:
        options.fileIds?.length === 0 ? undefined : options.fileIds,
      topic_id: options.topic_id,
      topic_name: options.topic_name
    })

    return {
      success: status === 200,
      createdId: data.id
    }
  }
}
