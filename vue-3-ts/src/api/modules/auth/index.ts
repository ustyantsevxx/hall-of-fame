import { joinURL, withQuery } from 'ufo'

import {
  ACCESS_TOKEN_STORAGE_KEY,
  REFRESH_TOKEN_STORAGE_KEY
} from '@/api/modules/auth/constants'
import {
  ChangePasswordRequest,
  EmailCheckResponse,
  ResetPasswordRequest,
  SignInResponse,
  SocialSignInUrls,
  Token,
  VerifyEmailRequest
} from '@/api/modules/auth/types'
import { Service } from '@/core/Service'
import { EmailPassword } from '@/types'

class _AuthService extends Service {
  private accessTokenStorageKey = ACCESS_TOKEN_STORAGE_KEY
  private refreshTokenStorageKey = REFRESH_TOKEN_STORAGE_KEY

  saveTokens(accessToken: string, refreshToken: string) {
    localStorage.setItem(this.accessTokenStorageKey, accessToken)
    localStorage.setItem(this.refreshTokenStorageKey, refreshToken)
  }

  clearSavedTokens() {
    this.setAuthHeader()
    localStorage.removeItem(this.accessTokenStorageKey)
    localStorage.removeItem(this.refreshTokenStorageKey)
  }

  getAccessToken() {
    return localStorage.getItem(this.accessTokenStorageKey)
  }

  getRefreshToken() {
    return localStorage.getItem(this.refreshTokenStorageKey)
  }

  applySavedToken() {
    const savedAccessToken = this.getAccessToken()
    if (savedAccessToken) {
      this.setAuthHeader(savedAccessToken)
      return true
    }
    return false
  }

  setAuthHeader(accessToken?: string) {
    this.axios.defaults.headers.common['Authorization'] = accessToken
      ? `Bearer ${accessToken}`
      : false
  }

  getSocialSignInLinks(): SocialSignInUrls {
    const template = joinURL(this.apiHost, 'api/web/social')
    return {
      google: withQuery(template, { provider: 'google' }),
      apple: withQuery(template, { provider: 'apple' }),
      facebook: withQuery(template, { provider: 'facebook' })
    }
  }

  processTokens(accessToken: string, refreshToken: string) {
    this.saveTokens(accessToken, refreshToken)
    this.setAuthHeader(accessToken)
  }

  async refreshToken() {
    try {
      const { data } = await this.axios.post<Token>(this.e('token/refresh'), {
        refresh_token: this.getRefreshToken()
      })

      this.processTokens(data.access_token, data.refresh_token)
      return true
    } catch {
      return false
    }
  }

  async checkEmailInUse(email: string) {
    const { data } = await this.axios.get<EmailCheckResponse>(
      this.e('email/check'),
      {
        params: {
          email
        }
      }
    )
    return data.email_exists
  }

  async signUp({ password, email }: EmailPassword) {
    const { data } = await this.axios.post<SignInResponse>(this.e('signup'), {
      email,
      password
    })
    return data.user
  }

  async signIn({ email, password }: EmailPassword) {
    const { data } = await this.axios.post<SignInResponse>(this.e('signin'), {
      email,
      password
    })
    this.processTokens(data.token.access_token, data.token.refresh_token)
    return data.user
  }

  async signInWithSocial({
    provider,
    code
  }: {
    provider: string
    code: string
  }) {
    const url = joinURL(this.apiHost, '/api/web/socialCallback')
    const response = await this.axios.get<SignInResponse>(url, {
      params: {
        provider,
        code
      }
    })

    if (!response) {
      return
    }

    this.processTokens(
      response.data.token.access_token,
      response.data.token.refresh_token
    )

    return response.data.user
  }

  async logout() {
    await this.axios.delete(this.e('signout'))
    this.clearSavedTokens()
  }

  restorePassword({ email }: { email: string }) {
    return this.axios.post(this.e('password/send_link'), { email })
  }

  async resetPassword(data: ResetPasswordRequest) {
    return this.axios.post(this.e('password/reset'), data)
  }

  async changePassword(data: ChangePasswordRequest) {
    // TODO xx xx xx xx
    return this.axios.post(this.e('password/change'), data)
  }

  async verifyEmail({ id, hash, expires, signature }: VerifyEmailRequest) {
    const { status } = await this.axios.get(
      this.e(`email/verify/${id}/${hash}`),
      {
        params: { expires, signature }
      }
    )

    return status === 204
  }

  validatePassword(password: string) {
    const regex = /^[\w!"#$%&'()*+,./:;<=>?@^`{}~-]{8,20}$/
    return regex.test(password)
  }
}

export const AuthService = new _AuthService('api/v1/auth')
