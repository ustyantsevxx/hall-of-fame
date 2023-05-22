import { User } from '../user/user.types'

export type SignInArgs = {
  phone: string
  code: string
}

export type Token = {
  token_type: string
  expires_in: number
  access_token: string
  refresh_token: string
}

export type SignInResponse = {
  user: User
  token_data: Token
}
