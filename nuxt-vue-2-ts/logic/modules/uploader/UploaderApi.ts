import { BaseApi } from '~/logic/core/BaseApi'
import { IApiResponse } from '~/logic/types/http-client'

import {
  FileRegisterRequest,
  FileRegisterResponse,
  FinishFileUploadingRequest,
  FinishFileUploadingResponse,
  UploadFilePortionRequest,
  UploadFilePortionResponse
} from '.'

export class _UploaderApi extends BaseApi {
  async registerFile(
    options: FileRegisterRequest
  ): Promise<IApiResponse<FileRegisterResponse>> {
    return await this.post(`register`, options)
  }

  async uploadFilePortion(
    options: UploadFilePortionRequest
  ): Promise<IApiResponse<UploadFilePortionResponse>> {
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-binary; charset=x-user-defined',
        'Upload-Id': options.uploadId,
        'Portion-From': options.from,
        'Portion-Size': options.portionSize
      }
    }
    return await this.patch(`upload`, options.portion, config)
  }

  async finishFileUploading(
    options: FinishFileUploadingRequest
  ): Promise<IApiResponse<FinishFileUploadingResponse>> {
    const config = {
      headers: { 'Upload-Id': options.uploadId }
    }
    return await this.patch(`finish`, {}, config)
  }
}
