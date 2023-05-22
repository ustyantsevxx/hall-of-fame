import { httpClient } from '~/logic/modules/container'
import { _UploaderApi } from '~/logic/modules/uploader/UploaderApi'
import { _UploaderService } from '~/logic/modules/uploader/UploaderService'

export const UploaderModule = new _UploaderService(
  new _UploaderApi({
    namespace: 'uploader_module',
    httpClient
  })
)

export * from '~/logic/modules/uploader/uploader.constants'
export * from '~/logic/modules/uploader/uploader.types'
