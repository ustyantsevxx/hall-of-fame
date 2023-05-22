import { _AuthApi } from '~/logic/modules/auth/AuthApi'
import { _AuthService } from '~/logic/modules/auth/AuthService'
import { httpClient } from '~/logic/modules/container'

export const AuthModule = new _AuthService(
  new _AuthApi({ namespace: 'api/v1/auth', httpClient })
)

export * from './auth.types'
