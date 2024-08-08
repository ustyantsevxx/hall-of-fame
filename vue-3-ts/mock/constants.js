export const VERIFIED_USER_EMAIL = 'email@email.com'
export const VERIFIED_USER_ID = 111
export const VERIFIED_USER_PASSWORD = 'password'

export const VERIFIED_USER = {
  id: VERIFIED_USER_ID,
  username: 'xx xx',
  email: VERIFIED_USER_EMAIL,
  email_verified: true,
  has_data: true,
  has_subscription: true
}

export const NOT_VERIFIED_USER_EMAIL = 'not_verified_email@email.com'
export const NOT_VERIFIED_USER_ID = 222
export const NOT_VERIFIED_USER_PASSWORD = 'password'

export const NOT_VERIFIED_USER = {
  id: NOT_VERIFIED_USER_ID,
  username: 'Not verified',
  email: NOT_VERIFIED_USER_EMAIL,
  email_verified: false,
  has_data: false,
  has_subscription: false
}

export const USER_TOKEN = {
  token_type: 'Bearer',
  expires_in: 1_296_000,
  access_token: 'test',
  refresh_token: 'test'
}
