import { httpClient } from '~/logic/modules/container'
import { _UserOperationsApi } from '~/logic/modules/user-operations/UserOperationsApi'
import { _UserOperationsService } from '~/logic/modules/user-operations/UserOperationsService'

export const UserOperationsModule = new _UserOperationsService(
  new _UserOperationsApi({ namespace: 'api/v1/user_operations', httpClient })
)

// export * from '~/logic/modules/user-operations/user-operations.constants'
// export * from '~/logic/modules/user-operations/user-operations.types'
