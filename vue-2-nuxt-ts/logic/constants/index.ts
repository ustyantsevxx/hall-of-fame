import { joinURL } from 'ufo'

import { RUNTIME_VARS } from './core'

export const MAIN_WEBSITE_LINK = 'xxx'

export const PRIVACY_POLICY_LINK = joinURL(
  RUNTIME_VARS.API_HOST,
  '/files/privacy-policy'
)

export const SUPPORT_PHONE = {
  DISPLAYED: 'xxx',
  PHONE: 'xxx'
}

export const APP_LINKS = {
  GOOGLE_PLAY: '#',
  APP_STORE: '#'
}

export const SOCIAL_LINKS = {
  OK: 'https://ok.ru/xxx',
  VK: 'https://vk.com/xxx',
  INSTAGRAM: 'https://www.instagram.com/xxx'
}
