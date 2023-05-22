<script>
import { UploaderService } from '~/logic/modules/uploader/uploader.service'

export default {
  data() {
    return {
      file: null
    }
  },

  computed: {
    completed() {
      return this.file?.uploadingProgress === 100
    }
  },

  watch: {
    completed(value) {
      if (value) {
        this.$emit('complete', this.file.id)
      }
    }
  },

  methods: {
    upload(file) {
      const [fileRef] = UploaderService.uploadFiles([file])
      this.file = fileRef
    },

    cancel() {
      this.file.needToCancelUploading = true
    },

    deleteFile() {
      this.file = null
    }
  },

  render() {
    return this.$scopedSlots.default({
      progress: this.file?.uploadingProgress ?? 0,
      url: this.file?.url ?? null,
      completed: this.completed
    })
  }
}
</script>
