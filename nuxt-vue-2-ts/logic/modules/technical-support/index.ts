import { httpClient } from '~/logic/modules/container'
import { _TechnicalSupportApi } from '~/logic/modules/technical-support/TechnicalSupportApi'
import { _TechnicalSupportService } from '~/logic/modules/technical-support/TechnicalSupportService'

export const TechnicalSupportModule = new _TechnicalSupportService(
  new _TechnicalSupportApi({
    namespace: 'api/v1/technical_support',
    httpClient
  })
)

export * from '~/logic/modules/technical-support/technical-support.constants'
export * from '~/logic/modules/technical-support/technical-support.types'
