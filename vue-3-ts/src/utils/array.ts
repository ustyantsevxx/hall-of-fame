import { isEqual } from 'lodash-es'

import { getRandomInt } from '@/utils/random'

export const arrayToggle = <T>(array: T[], value: T) => {
  const existing = array.find(x => isEqual(x, value))
  return existing !== undefined
    ? array.filter(x => !isEqual(x, existing))
    : [...array, value]
}

export const withIds = <T>(array: T[]) => {
  return array.map(x => ({ ...x, id: getRandomInt() }))
}
