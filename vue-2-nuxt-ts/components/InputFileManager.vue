<template>
  <div class="space-y-35">
    <FileListImages
      v-if="imageFiles.length > 0"
      :files="imageFiles"
      @remove="removeFile"
    />
    <FileListDefault
      v-if="defaultFiles.length > 0"
      :files="defaultFiles"
      @remove="removeFile"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import FileListDefault from '~/components/FileListDefault.vue'
import FileListImages from '~/components/FileListImages.vue'
import { UploaderFile } from '~/logic/modules/uploader'
import { ACCEPTABLE_FILE_TYPES } from '~/logic/modules/uploader/uploader.constants'

@Component({
  components: {
    FileListDefault,
    FileListImages
  }
})
export default class InputFileManager extends Vue {
  @Prop({ type: Array, required: true }) files!: UploaderFile[]

  get defaultFiles() {
    return this.filterFilesByMimeTypes(ACCEPTABLE_FILE_TYPES.application)
  }

  get imageFiles() {
    return this.filterFilesByMimeTypes(ACCEPTABLE_FILE_TYPES.image)
  }

  filterFilesByMimeTypes(mimeTypes) {
    return this.files.filter(file => {
      const fileType: string = file.type
      return mimeTypes.includes(fileType)
    })
  }

  removeFile(fileId) {
    this.$emit('remove', fileId)
  }
}
</script>
