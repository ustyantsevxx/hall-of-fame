/**
 * Immutable shuffle of an array
 * @template T
 * @param array {T[]} Array to shuffle
 * @returns {T[]} Shuffled copy of an array
 */
export const arrayShuffle = <T>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5)
}

export const lastItem = <T>(array: T[]): T => {
  return array[array.length - 1]
}
