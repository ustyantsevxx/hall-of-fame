import { v4 } from 'uuid'

export const getUniqueString = () => `xx__${v4()}`

export const getRandomInt = () =>
  Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
