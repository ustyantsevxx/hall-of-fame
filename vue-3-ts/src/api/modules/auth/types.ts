import { User } from '@/api/shared/types'

export type Token = {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export type SignInResponse = {
  user: User
  token: Token
}

export type SocialSignInUrls = {
  google: string
  apple: string
  facebook: string
}

export type EmailCheckResponse = {
  email_exists: boolean
}

export type ResetPasswordRequest = {
  password: string
  password_confirmation: string
  email: string
  token: string
}

export type ChangePasswordRequest = {
  password: string
  password_confirmation: string
}

export type VerifyEmailRequest = {
  id: string
  hash: string
  expires: string
  signature: string
}
