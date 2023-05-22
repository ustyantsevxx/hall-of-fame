const _separateThousands = (numberString: string) => {
  const withTrailingZeros = numberString.replace(/\d(?=(\d{3})+\.)/g, '$& ')
  return withTrailingZeros.replace(/\.00$/, '')
}

export const separateThousands = (number: number) => {
  return number ? _separateThousands(number.toFixed(2)) : '0'
}

export const formatRuble = (number?: number) => {
  return `${separateThousands(number || 0)} ₽`
}
