<template>
  <ProviderFileUpload
    ref="fileUploadProvider"
    v-slot="{ progress, completed, url }"
    @complete="emitUpload"
  >
    <div>
      <label for="dropzone-input">
        <input
          id="dropzone-input"
          ref="fileInput"
          type="file"
          class="sr-only"
          accept=".jpg,.jpeg,.png"
          @change="handleNativeInput"
        />
      </label>

      <div
        v-if="!file && (!src || srcDeclined)"
        class="relative flex h-full w-full flex-col items-center justify-center rounded-6 border border-dashed border-white transition-colors"
        :class="{ 'bg-white/10': draggingOver }"
        @dragleave="draggingOver = false"
        @dragover.prevent="draggingOver = true"
        @drop.prevent="handleDrop"
        @click.stop="invokeFileInput"
      >
        <div
          class="flex select-none flex-col items-center justify-center"
          :class="{ 'pointer-events-none': draggingOver }"
        >
          <SVGDropzoneUpload
            class="transition-colors"
            :class="{
              'text-light-30': !draggingOver,
              'text-white': !draggingOver
            }"
          />

          <div class="mt-16 text-center text-h2">
            <p>{{ $t('drag-and-drop-image') }}</p>
            <p>
              {{ $t('or') }}

              <button class="text-cyan text-h2" type="button">
                {{ $t('upload') }}
              </button>

              {{ $t('from-your-computer') }}
            </p>
          </div>

          <p class="mt-54 text-white/60 text-main">PNG, JPEG</p>
        </div>
      </div>

      <div
        v-else-if="file && !completed"
        class="relative flex h-full w-full items-center justify-center overflow-hidden rounded-6 border border-white bg-white/10 p-16"
      >
        <button
          class="absolute right-8 top-8"
          :title="$t('cancel-upload')"
          type="button"
          @click="cancelUpload"
        >
          <SVGIcon24Close />
        </button>

        <div class="space-y-8 text-center">
          <p class="break-all text-h2">{{ file.name }}</p>
          <p class="text-white/60 text-main">{{ formattedFileSize }}</p>
        </div>

        <div class="absolute inset-x-0 bottom-0 h-7 bg-white/20">
          <div
            class="h-full bg-cyan transition-all"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>
      </div>

      <div
        v-else-if="(file && completed) || (src && !srcDeclined)"
        class="relative flex h-full w-full overflow-hidden rounded-6 border border-white"
      >
        <div class="absolute top-16 left-16 space-x-4">
          <button
            class="h-32 w-32 bg-white p-4 text-light shadow ring-offset-1 ring-offset-black"
            type="button"
            :title="$t('select-another-image')"
            @click="invokeFileInput"
          >
            <SVGIcon24Edit />
          </button>

          <button
            class="h-32 w-32 bg-white p-4 text-light shadow ring-offset-1 ring-offset-black"
            :title="$t('remove-image')"
            type="button"
            @click="deleteFile"
          >
            <SVGIcon24Delete />
          </button>
        </div>
        <img
          class="w-full object-contain"
          :src="url || src"
          :alt="$t('batterys-image')"
        />
      </div>

      <ModalConfirm
        ref="MaxSizeExceededModal"
        :confirm-text="$t('ok')"
        no-cancel
        :title="$t('error-0')"
        :subtitle="$t('max-file-size-is-formattedmaxsize', [formattedMaxSize])"
      />
    </div>
  </ProviderFileUpload>
</template>

<script>
import filesize from 'filesize'

import ModalConfirm from '~/components/ModalConfirm.vue'
import ProviderFileUpload from '~/components/ProviderFileUpload.vue'
import { getFileExtension } from '~/logic/modules/uploader/uploader.utils'

export default {
  components: {
    ProviderFileUpload,
    ModalConfirm
  },

  props: {
    value: { type: Number, default: null },
    src: { type: String, default: undefined },
    maxSizeInBytes: { type: Number, default: 5 * 1024 * 1024 }
  },

  data() {
    return {
      draggingOver: false,
      file: null,
      srcDeclined: false,
      permittedFileExtensions: ['png', 'jpeg', 'jpg']
    }
  },

  computed: {
    formattedFileSize() {
      return filesize(this.file?.size)
    },

    formattedMaxSize() {
      return filesize(this.maxSizeInBytes)
    }
  },

  watch: {
    value(value) {
      if (value === null) {
        this.file = null
      }
    }
  },

  methods: {
    deleteFile() {
      this.removeFile()
    },

    removeFile() {
      this.srcDeclined = true
      this.file = null
      this.emitUpload(null)
    },

    cancelUpload() {
      this.$refs.fileUploadProvider.cancel()
      this.removeFile()
    },

    async handleChange(file) {
      const fileExtension = getFileExtension(file.name)

      if (!this.permittedFileExtensions.includes(fileExtension)) {
        return
      } else if (file.size > this.maxSizeInBytes) {
        await this.$refs.MaxSizeExceededModal.open()
      } else {
        this.file = file
        this.$refs.fileUploadProvider.upload(this.file)
      }

      this.$refs.fileInput.value = null
    },

    handleNativeInput(e) {
      const file = e.target.files[0]
      this.handleChange(file)
    },

    handleDrop(e) {
      this.draggingOver = false
      const file = e.dataTransfer.files[0]
      this.handleChange(file)
    },

    invokeFileInput() {
      this.$refs.fileInput.click()
    },

    emitUpload(id) {
      this.$emit('input', id)
    }
  }
}
</script>
