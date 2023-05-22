import { ValidationException } from '~/logic/types/api-meta'

export interface UploaderFile {
  id: number
  filename: string
  type: string
  collectionName: string
  raw: File
  url: string
  uploadingProgress: number
  needToCancelUploading?: boolean
}

export interface FileUploadingEventArgs {
  file: File
  uploadId: number
  progress: number
}

export interface FileUploadingCancelEventArgs extends FileUploadingEventArgs {
  cancel: boolean
}

export interface FileUploadingErrorEventArgs {
  error: Error
  file: UploaderFile
}

export interface FileUploadingEventHandlers {
  register?: (event: FileUploadingEventArgs) => void
  beforePortionUpload?: (event: FileUploadingCancelEventArgs) => void
  progressUpdate?: (event: FileUploadingEventArgs) => void
  finish?: (event: FileUploadingEventArgs) => void
  error?: (event: FileUploadingErrorEventArgs) => void
}

export interface FileRegisterResponse {
  data: {
    id: number
  }
  status: boolean
}

export interface FileRegisterRequest {
  name: string
  collection_name: string
}

export interface UploadFilePortionRequest {
  uploadId: number
  from: number
  portionSize: number
  portion: ArrayBuffer
}

export interface UploadFilePortionResponse {
  status: boolean
  data?: ValidationException[]
}

export interface FinishFileUploadingRequest {
  uploadId: number
}

export interface FinishFileUploadingResponse {
  status: boolean
}
