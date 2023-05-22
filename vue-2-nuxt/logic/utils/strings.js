export const stringifyArrayIfNotEmpty = arr => {
  try {
    if (arr.length === 0) {
      return
    }
    const stringified = JSON.stringify(arr)
    return stringified
  } catch {}
}

export const tryParseJson = stringJson => {
  try {
    return JSON.parse(stringJson)
  } catch {}
}

export const joinNotEmpty = (...items) => {
  return [...items].filter(k => k).join(' ') || null
}
