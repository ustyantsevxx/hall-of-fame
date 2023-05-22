import { httpClient } from '~/logic/modules/container'
import { _TechnicalSupportTopicsApi } from '~/logic/modules/technical-support-topics/TechnicalSupportTopicsApi'
import { _TechnicalSupportTopicsService } from '~/logic/modules/technical-support-topics/TechnicalSupportTopicsService'

export const TechnicalSupportTopicsModule = new _TechnicalSupportTopicsService(
  new _TechnicalSupportTopicsApi({
    namespace: 'api/v1/technical_support_topics',
    httpClient
  })
)

// export * from '~/logic/modules/technical-support-topics/constants'
export * from '~/logic/modules/technical-support-topics/technical-support-topics.types'
