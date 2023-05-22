import { NextRouter } from 'next/router'

export const sleep = (ms: number) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const parseNumberOrNull = (value: any) => {
  const parsedNumericValue = +value
  return !Number.isNaN(parsedNumericValue) ? parsedNumericValue : null
}

export const updateRouterQuery = (
  router: NextRouter,
  query: Record<string, any>,
  { saveHash = false, noShallow = false } = {}
) => {
  return router.replace(
    {
      pathname: location.pathname,
      query,
      hash: saveHash ? location.hash : undefined
    },
    undefined,
    {
      shallow: !noShallow
    }
  )
}

export const keepNumbersOnly = (value: string) => {
  return value.replace(/\D/g, '')
}

export const tryParseJson = (stringJson: any) => {
  try {
    return JSON.parse(stringJson) as object
  } catch {
    return null
  }
}

export const formatPhoneNumber = (rawPhone: string) => {
  const phone = keepNumbersOnly(rawPhone)

  const validRussianPhone = phone.length === 11
  if (!validRussianPhone) {
    return '—'
  }

  return `+7 (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(
    7,
    9
  )}-${phone.slice(9, 11)}`
}
