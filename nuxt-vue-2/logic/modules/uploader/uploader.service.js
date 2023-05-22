import { random } from 'lodash-es'

import { BaseService } from '~/logic/core/base.service'
import { FILE_COLLECTIONS } from '~/logic/modules/uploader/uploader.constants'
import {
  convertToBinary,
  getFileExtension,
  getFileSlice
} from '~/logic/modules/uploader/uploader.utils'

const BYTES_PER_REQUEST = 1024 * 1024

export class _UploaderService extends BaseService {
  uploadFiles(files, onError) {
    const filesToUpload = [...files].map(file => {
      const extension = getFileExtension(file.name)
      const collection = this._getCollectionNameForFile(extension)

      return {
        id: random(Number.MAX_SAFE_INTEGER),
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
        this._uploadFile(fileReference, {
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

  async _uploadFile(file, eventHandlers) {
    try {
      const uploadId = await this._registerFile(file.raw.name)
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
        to = from + BYTES_PER_REQUEST

        const portion = getFileSlice({
          file: file.raw,
          start: from,
          end: to
        })

        await this._uploadPortion({
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

      await this._finishFileUploading({ uploadId })
      if (eventHandlers.finish) {
        eventHandlers.finish({ file: file.raw, uploadId, progress: 100 })
      }
    } catch (error) {
      if (eventHandlers.error) {
        eventHandlers.error({ error, file })
      }
    }
  }

  async _registerFile(fileName) {
    const extension = getFileExtension(fileName)
    const collection = this._getCollectionNameForFile(extension)

    const fileToRegister = {
      name: fileName,
      collection_name: collection
    }

    const response = await this.axios.post(
      this.getPath('register'),
      fileToRegister
    )

    if (response.status === 200) {
      return response.data.id
    } else {
      throw new Error('File register error')
    }
  }

  _getCollectionNameForFile(fileExtension) {
    const formattedFileExtension = fileExtension.toLowerCase()

    const collection = FILE_COLLECTIONS.find(collection =>
      collection.extensions.includes(formattedFileExtension)
    )
    return collection?.name ?? ''
  }

  _uploadPortion({ uploadId, portion, from }) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader()
      fileReader.onloadend = async event => {
        if (event.target?.readyState === FileReader.DONE) {
          const binaryPortion = convertToBinary(event.target.result)
          const headers = {
            'Content-Type': 'application/x-binary; charset=x-user-defined',
            'Upload-Id': uploadId,
            'Portion-From': from,
            'Portion-Size': BYTES_PER_REQUEST
          }

          const response = await this.axios.patch(
            this.getPath('upload'),
            binaryPortion,
            {
              headers
            }
          )

          if (response.status !== 200) {
            const errorDescription = response.data
              ? response.data[0].description
              : 'Portion upload error'
            reject(errorDescription)
          } else {
            resolve(response.data)
          }
        }
      }

      fileReader.readAsBinaryString(portion)
    })
  }

  async _finishFileUploading({ uploadId }) {
    const { status } = await this.axios.patch(
      this.getPath('finish'),
      {},
      { headers: { 'Upload-Id': uploadId } }
    )

    if (status !== 200) {
      throw new Error('File upload finish error')
    }
  }
}

export const UploaderService = new _UploaderService('api/v1/uploader')
