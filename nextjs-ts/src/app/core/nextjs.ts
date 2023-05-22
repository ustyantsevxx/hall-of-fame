import { BRAND_NAME } from '../constants'

export const constructPageTitle = (title?: string) => {
  return [title, BRAND_NAME].filter(Boolean).join(' | ')
}
