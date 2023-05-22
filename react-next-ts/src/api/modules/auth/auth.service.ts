import { deleteCookie, getCookie, setCookie } from 'cookies-next'
import dayjs from 'dayjs'

import { tryParseJson } from '../../../utils'
import { BaseService } from '../../shared/base.service'
import { SignInArgs, SignInResponse } from './auth.types'

class AuthServiceClass extends BaseService {
  TOKENS_COOKIES_KEY = 'x-auth'

  saveTokens(accessToken: string, refreshToken: string) {
    setCookie(
      this.TOKENS_COOKIES_KEY,
      { accessToken, refreshToken },
      { expires: dayjs().add(15, 'days').toDate() }
    )
  }

  clearSavedTokens() {
    this.setAuthHeader()
    deleteCookie(this.TOKENS_COOKIES_KEY)
  }

  getTokens(): { accessToken?: string; refreshToken?: string } {
    const result = tryParseJson(getCookie(this.TOKENS_COOKIES_KEY))
    return result || {}
  }

  applySavedToken(tokens?: { accessToken?: string; refreshToken?: string }) {
    const { accessToken } = tokens ?? this.getTokens()
    if (accessToken) {
      this.setAuthHeader(accessToken)
      return true
    }
    return false
  }

  setAuthHeader(accessToken?: string) {
    this.axios.defaults.headers.common['Authorization'] = accessToken
      ? `Bearer ${accessToken}`
      : false
  }

  processTokens(accessToken: string, refreshToken: string) {
    this.saveTokens(accessToken, refreshToken)
    this.setAuthHeader(accessToken)
  }

  async sendSmsCode(phone: string) {
    return this.makeSafeRequest<null>(
      {
        method: 'POST',
        url: this.getPath('send_sms'),
        data: { phone }
      },
      { okIfStatus: 204 }
    )
  }

  async signIn({ phone, code }: SignInArgs) {
    const { ok, data } = await this.makeSafeRequest<SignInResponse>(
      {
        method: 'POST',
        url: this.getPath('sign_in'),
        data: { phone, code }
      },
      { okIfStatus: 200 }
    )

    if (ok && data) {
      this.processTokens(
        data.token_data.access_token,
        data.token_data.refresh_token
      )
      return true
    }
    return false
  }
}

export const AuthService = new AuthServiceClass('api/v1/auth')
