export const getFileExtension = (fileName: string) => {
  return fileName.slice(((fileName.lastIndexOf('.') - 1) >>> 0) + 2)
}

export const downloadFileToDevice = (blob: Blob, fileName: string) => {
  const downloadLink = window.document.createElement('a')
  downloadLink.href = window.URL.createObjectURL(blob)
  downloadLink.download = fileName
  document.body.append(downloadLink)
  downloadLink.click()
  downloadLink.remove()
}
