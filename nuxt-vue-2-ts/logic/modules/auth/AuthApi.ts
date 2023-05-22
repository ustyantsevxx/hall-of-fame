import { BaseApi } from '~/logic/core/BaseApi'

import { SendCodeRequestParams } from '.'

export class _AuthApi extends BaseApi {
  sendAuthCode({ phone }: SendCodeRequestParams) {
    return this.post<{}>('signin', { phone })
  }
}
