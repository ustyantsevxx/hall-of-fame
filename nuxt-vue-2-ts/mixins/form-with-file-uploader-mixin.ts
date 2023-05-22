import { Component, Vue } from 'nuxt-property-decorator'

import {
  ACCEPTABLE_FILE_TYPES,
  FileUploadingErrorEventArgs,
  UploaderFile
} from '~/logic/modules/uploader'

@Component
export default class FormWithFileUploaderMixin extends Vue {
  files: UploaderFile[] = []

  get acceptableFileTypes() {
    return [
      ...ACCEPTABLE_FILE_TYPES.application,
      ...ACCEPTABLE_FILE_TYPES.image
    ].join(',')
  }

  get allFilesUploaded() {
    return this.files.every(file => file.uploadingProgress === 100)
  }

  get submitAllowed() {
    return this.files.length > 0 && this.allFilesUploaded
  }

  updateFiles(value: UploaderFile[]) {
    this.files = value
  }

  handleUploadingError(errorEvent: FileUploadingErrorEventArgs) {
    this.$toasted.show(errorEvent.error.message, {
      containerClass: 'top-20 right-30',
      className: 'rounded-10',
      closeOnSwipe: true,
      duration: 5000
    })
  }

  removeFile(fileId) {
    const fileToRemove = this.files.find(file => file.id === fileId)
    if (fileToRemove) {
      fileToRemove.needToCancelUploading = true
    }
    if (fileToRemove) {
      this.updateFiles(this.files.filter(file => file.id !== fileId))
    }
  }
}
