import { httpClient } from '~/logic/modules/container'
import { _UsersApi } from '~/logic/modules/users/UsersApi'
import { _UsersService } from '~/logic/modules/users/UsersService'

export const Users = new _UsersService(
  new _UsersApi({ namespace: 'api/v1/users', httpClient })
)

export * from '~/logic/modules/users/users.constants'
export * from '~/logic/modules/users/users.types'
