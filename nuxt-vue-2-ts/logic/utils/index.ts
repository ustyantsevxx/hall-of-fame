import { uniqueId } from 'lodash-es'

export const LONG_HYPHEN = '—'

export const valueOrLongHyphen = (value: any) => value ?? LONG_HYPHEN

export const getUid = () => uniqueId('xx_')

export const getRandomInteger = (min = 1, max = 2) => {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export const isDefined = (v: any) => v !== null && v !== undefined
