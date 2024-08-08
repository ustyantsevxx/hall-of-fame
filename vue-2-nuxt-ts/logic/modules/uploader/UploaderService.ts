import { BaseService } from '~/logic/core/BaseService'
import { FILE_COLLECTIONS } from '~/logic/modules/uploader/uploader.constants'
import { _UploaderApi } from '~/logic/modules/uploader/UploaderApi'
import { getRandomInteger } from '~/logic/utils'
import { getFileExtension } from '~/logic/utils/files'

import {
  FileUploadingErrorEventArgs,
  FileUploadingEventHandlers,
  UploaderFile,
  UploadFilePortionResponse
} from '.'

const convertToBinary = stringData => {
  const ords = Array.prototype.map.call(stringData, x => {
    // eslint-disable-next-line unicorn/number-literal-case
    return x.charCodeAt(0) & 0xff
  })
  // @ts-ignore
  const ui8a = new Uint8Array(ords)
  return ui8a.buffer
}

const getFileSlice = ({ file, start, end }): Blob => {
  return (
    file?.slice?.(start, end) ||
    file?.webkitSlice?.(start, end) ||
    file?.mozSlice?.(start, end)
  )
}

export class _UploaderService extends BaseService<_UploaderApi> {
  bytesPerRequest = 1024 * 1024

  uploadFiles(
    files: File[],
    onError?: (event: FileUploadingErrorEventArgs) => void
  ): UploaderFile[] {
    const filesToUpload: UploaderFile[] = [...files].map(file => {
      const extension = getFileExtension(file.name)
      const collection = this.getCollectionNameForFile(extension)

      return {
        id: getRandomInteger(1, 1000000),
        collectionName: collection,
        filename: file.name,
        type: file.type,
        uploadingProgress: 0,
        raw: file,
        url: URL.createObjectURL(file),
        needToCancelUploading: false
      }
    })

    for (const file of filesToUpload) {
      const fileReference = file

      if (fileReference) {
        this.uploadFile(fileReference, {
          register: ({ uploadId }) => {
            fileReference.id = uploadId
          },
          progressUpdate: ({ progress }) => {
            fileReference.uploadingProgress = progress
          },
          beforePortionUpload: event => {
            if (fileReference.needToCancelUploading) {
              event.cancel = true
            }
          },
          finish: () => {
            fileReference.uploadingProgress = 100
          },
          error: onError
        })
      }
    }

    return filesToUpload
  }

  private async uploadFile(
    file: UploaderFile,
    eventHandlers: FileUploadingEventHandlers
  ) {
    try {
      const uploadId = await this.registerFile(file.raw.name)
      if (eventHandlers.register) {
        eventHandlers.register({ uploadId, file: file.raw, progress: 0 })
      }

      let from = 0
      let to = 0
      let progress = 0

      while (file.raw.size > to) {
        const options = {
          file: file.raw,
          uploadId,
          progress,
          cancel: false
        }
        if (eventHandlers.beforePortionUpload) {
          eventHandlers.beforePortionUpload(options)

          if (options.cancel) {
            return
          }
        }

        from = to
        to = from + this.bytesPerRequest

        const portion = getFileSlice({
          file: file.raw,
          start: from,
          end: to
        })

        await this.uploadPortion({
          uploadId,
          from,
          portion
        })

        progress = Math.round(to / (file.raw.size / 100))
        progress = progress > 100 ? 100 : progress
        if (eventHandlers.progressUpdate) {
          eventHandlers.progressUpdate({ file: file.raw, uploadId, progress })
        }
      }

      await this.finishFileUploading({ uploadId })
      if (eventHandlers.finish) {
        eventHandlers.finish({ file: file.raw, uploadId, progress: 100 })
      }
    } catch (error) {
      if (eventHandlers.error) {
        eventHandlers.error({ error, file })
      }
    }
  }

  private async registerFile(fileName): Promise<number> {
    const extension = getFileExtension(fileName)
    const collection = this.getCollectionNameForFile(extension)

    const fileToRegister = {
      name: fileName,
      collection_name: collection
    }

    const response = await this.api.registerFile(fileToRegister)

    if (response.status === 200) {
      return response.data.data.id
    } else {
      throw new Error('xx xx xx xx')
    }
  }

  getCollectionNameForFile(fileExtension: string) {
    const formattedFileExtension = fileExtension.toLowerCase()

    const collection = FILE_COLLECTIONS.find(collection =>
      collection.extensions.includes(formattedFileExtension)
    )
    return collection?.name ?? ''
  }

  private uploadPortion({
    uploadId,
    portion,
    from
  }): Promise<UploadFilePortionResponse> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onloadend = async event => {
        if (event.target?.readyState === FileReader.DONE) {
          const binaryPortion = convertToBinary(event.target.result)
          const response = await this.api.uploadFilePortion({
            portion: binaryPortion,
            from,
            uploadId,
            portionSize: this.bytesPerRequest
          })

          if (response.status !== 200) {
            const errorDescription = response.data
              ? response.data[0].description
              : 'xx xx xx'
            reject(errorDescription)
          } else {
            resolve(response.data)
          }
        }
      }

      fileReader.readAsBinaryString(portion)
    })
  }

  private async finishFileUploading({ uploadId }) {
    const { status } = await this.api.finishFileUploading({ uploadId })

    if (status !== 200) {
      throw new Error('xx xx xx')
    }
  }
}
