const _separateThousands = (numberString: string) => {
  return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

/**
 * @example
 * separateThousands(95645.34) => '95 645.34'
 */
const separateThousands = (number: number) => {
  return number ? _separateThousands(number.toString()) : '0'
}

/**
 * @example
 * prettify(95645) => '95 645.00'
 */
const prettify = (number: number) => {
  return _separateThousands((number || 0).toFixed(2))
}

const formatRuble = (number?: number) => {
  return `${prettify(number || 0)} ₽`
}

export { formatRuble, prettify, separateThousands }
