import { BaseService } from '~/logic/core/BaseService'
import { _AuthApi } from '~/logic/modules/auth/AuthApi'

export class _AuthService extends BaseService<_AuthApi> {
  codeResendTime = 60

  async sendAuthCode(phone: string) {
    const response = await this.api.sendAuthCode({ phone })
    return response.status === 201
      ? { success: true }
      : {
          success: false,
          error: response.data[0].description
        }
  }
}
