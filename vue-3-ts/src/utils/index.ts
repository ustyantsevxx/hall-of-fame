export const isDefined = (value: unknown) =>
  value !== null && value !== undefined

export const sleep = (ms = 150) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}
