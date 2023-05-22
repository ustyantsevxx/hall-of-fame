export const minMax = arr => {
  let min = Number.POSITIVE_INFINITY
  let max = Number.NEGATIVE_INFINITY

  for (const item of arr) {
    if (item < min) {
      min = item
    }

    if (item > max) {
      max = item
    }
  }

  return [min, max]
}
