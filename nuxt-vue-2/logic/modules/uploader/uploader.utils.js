export const getFileExtension = fileName => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
}

export const convertToBinary = stringData => {
  const elements = Array.prototype.map.call(stringData, x => {
    // eslint-disable-next-line unicorn/number-literal-case
    return x.charCodeAt(0) & 0xff
  })
  const ui8a = new Uint8Array(elements)
  return ui8a.buffer
}

export const getFileSlice = ({ file, start, end }) => {
  return (
    file?.slice?.(start, end) ||
    file?.webkitSlice?.(start, end) ||
    file?.mozSlice?.(start, end)
  )
}
