<template>
  <div>
    <label :for="uid">
      <input
        :id="uid"
        ref="fileInput"
        :accept="accept"
        :disabled="disabled"
        type="file"
        hidden
        multiple
        @input="handleChange"
      />
    </label>

    <div
      :tabindex="disabled ? -1 : 0"
      :class="{
        'opacity-50': disabled,
        'pointer-events-none': disabled
      }"
      role="button"
      class="flex items-center"
      @click="openNativePicker"
      @keydown.enter="openNativePicker"
    >
      <slot name="toggle"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from 'nuxt-property-decorator'

import { UploaderFile, UploaderModule } from '~/logic/modules/uploader'
import { getUid } from '~/logic/utils'

@Component
export default class InputFile extends Vue {
  @Model('input', { type: Array }) value!: UploaderFile[]

  @Prop({ type: String, default: '' }) accept!: string
  @Prop({ type: Number, default: Number.POSITIVE_INFINITY }) maxCount!: number

  uid = ''

  get inputRef(): HTMLInputElement {
    return this.$refs.fileInput as any
  }

  get disabled() {
    return this.value.length >= this.maxCount
  }

  mounted() {
    this.uid = getUid()
  }

  openNativePicker() {
    if (this.disabled) {
      return
    }

    this.inputRef.click()
  }

  handleChange() {
    if (this.inputRef.files) {
      const filesToUpload = [...this.inputRef.files]
      const newTotalCount = this.value.length + filesToUpload.length

      if (newTotalCount > this.maxCount) {
        const errorEvent = {
          error: new Error(
            `Превышено максимальное количество файлов (${this.maxCount} шт.)`
          )
        }
        this.$emit('uploading-error', errorEvent)
        return
      }

      const uploadingFiles = UploaderModule.uploadFiles(
        filesToUpload,
        event => {
          this.$emit('uploading-error', event)
          event.file.needToCancelUploading = true
          const filesWithoutErrorFile = this.value.filter(
            file => file.id !== event.file.id
          )
          this.$emit('input', filesWithoutErrorFile)
        }
      )

      const uploaderFiles = [...this.value, ...uploadingFiles]
      this.$emit('input', uploaderFiles)
      this.inputRef.value = ''
    }
  }
}
</script>
