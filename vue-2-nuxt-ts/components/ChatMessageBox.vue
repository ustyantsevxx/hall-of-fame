<template>
  <div class="flex relative flex-col" @click="focusTextarea">
    <div
      class="overflow-hidden py-22 pr-60 pl-30 rounded-10 border transition-colors"
      :class="{
        'border-gray-100 ': !invalid && !textareaFocused,
        'border-blue': !invalid && textareaFocused,
        'border-red': invalid
      }"
    >
      <label :for="uid" style="width: 825px">
        <span ref="grow" class="grid break-all grow-wrap">
          <textarea
            :id="uid"
            ref="textarea"
            :value="message"
            class="outline-none resize-none"
            placeholder="xx xx..."
            rows="1"
            @focus="textareaFocused = true"
            @blur="textareaFocused = false"
            @input="handleTextareaInput"
            @keydown.enter.exact.prevent="$emit('enter')"
          ></textarea>
        </span>
      </label>

      <InputFileManager
        :files="files"
        :class="{ 'mt-23': files.length > 0 }"
        @click.native.stop
        @remove="removeFile"
      />
    </div>

    <InputFile
      :value="files"
      :accept="acceptableFileTypes"
      :max-count="MAX_FILES_COUNT_IN_MESSAGE"
      class="absolute top-24 right-30"
      @input="updateFiles"
      @uploading-error="handleUploadingError"
      @click.native.stop
    >
      <template #toggle>
        <button
          tabindex="-1"
          title="xx xx"
          class="hover:opacity-80 active:opacity-60"
          :disabled="uploadFilesButtonDisabled"
          @click.prevent
        >
          <ClipAngleGradientSVG />
        </button>
      </template>
    </InputFile>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import ClipAngleGradientSVG from '~/assets/svg/clip-angle-gradient.svg'
import InputFile from '~/components/InputFile.vue'
import InputFileManager from '~/components/InputFileManager.vue'
import { MAX_FILES_COUNT_IN_MESSAGE } from '~/logic/modules/technical-support'
import {
  FileUploadingErrorEventArgs,
  UploaderFile
} from '~/logic/modules/uploader'
import { ACCEPTABLE_FILE_TYPES } from '~/logic/modules/uploader/uploader.constants'
import { getUid } from '~/logic/utils'

@Component({
  components: {
    InputFileManager,
    InputFile,
    ClipAngleGradientSVG
  }
})
export default class ChatMessageBox extends Vue {
  @Prop({ type: Boolean, default: false }) invalid!: boolean
  @Prop({ type: String, required: true }) message!: string
  @Prop({ type: Array, required: true }) files!: UploaderFile[]

  MAX_FILES_COUNT_IN_MESSAGE = MAX_FILES_COUNT_IN_MESSAGE

  uid = ''
  textareaFocused: boolean = false

  get wrapperRef() {
    return this.$refs.grow as any
  }

  get acceptableFileTypes() {
    return [
      ...ACCEPTABLE_FILE_TYPES.application,
      ...ACCEPTABLE_FILE_TYPES.image
    ].join(',')
  }

  get textareaRef() {
    return this.$refs.textarea as HTMLElement
  }

  get uploadFilesButtonDisabled() {
    return this.files.length >= this.MAX_FILES_COUNT_IN_MESSAGE
  }

  mounted() {
    this.uid = getUid()
  }

  handleTextareaInput(event: any) {
    this.$emit('update:message', event.target.value)
    this.wrapperRef.dataset.replicatedValue = event.target.value
  }

  handleUploadingError(errorEvent: FileUploadingErrorEventArgs) {
    this.$toasted.show(errorEvent.error.message, {
      containerClass: 'top-20 right-30',
      className: 'rounded-10',
      closeOnSwipe: true,
      duration: 5000
    })
  }

  focusTextarea() {
    this.textareaRef.focus()
  }

  removeFile(fileId) {
    const fileIndexToRemove = this.files.findIndex(file => file.id === fileId)
    const fileToRemove = this.files[fileIndexToRemove]
    if (fileToRemove) {
      fileToRemove.needToCancelUploading = true
    }
    const files = [...this.files]
    files.splice(fileIndexToRemove, 1)
    this.updateFiles(files)
  }

  updateFiles(value) {
    this.$emit('update:files', value)
  }
}
</script>

<style scoped>
.grow-wrap {
  display: grid;
}

.grow-wrap::after {
  content: attr(data-replicated-value) ' ';
  white-space: pre-wrap;
  visibility: hidden;
}

.grow-wrap > textarea,
.grow-wrap::after {
  grid-area: 1 / 1 / 2 / 2;
}
</style>
