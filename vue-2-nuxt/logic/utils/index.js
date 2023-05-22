import tinycolor from 'tinycolor2'
import { v4 } from 'uuid'

export const getUid = () => `xx-${v4().slice(0, 7)}`

export const notUndefinedOrNull = value => {
  return value !== undefined && value !== null
}

export const opacify = (color, opacity) => {
  return tinycolor(color).setAlpha(opacity).toHex8String()
}

export const formatThousandsToK = num => {
  return num !== 0
    ? Math.sign(num) * (Math.abs(num) / 1000).toFixed(1) + 'k'
    : 0
}

export const parseNumberOrNull = queryValue => {
  const parsedNumericValue = +queryValue
  return !Number.isNaN(parsedNumericValue) ? parsedNumericValue : null
}
