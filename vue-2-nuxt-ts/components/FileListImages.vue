<template>
  <div class="grid gap-10 justify-start items-start grid-cols-auto-fill">
    <div v-for="file in files" :key="file.id" class="relative">
      <img
        :src="file.url"
        :alt="file.filename"
        class="object-cover w-100 h-70 rounded-10"
      />
      <button
        class="absolute -top-10 -right-10"
        @click.prevent="removeFile(file.id)"
      >
        <CloseCircleSVG />
      </button>
      <div
        v-if="file.uploadingProgress < 100"
        class="absolute top-1/2 left-1/2 w-34 transform -translate-x-1/2 -translate-y-1/2"
      >
        <Progress :progress="file.uploadingProgress" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import CloseCircleSVG from '~/assets/svg/close-circle.svg'
import Progress from '~/components/Progress.vue'
import { UploaderFile } from '~/logic/modules/uploader'

@Component({
  components: {
    Progress,
    CloseCircleSVG
  }
})
export default class FileListImages extends Vue {
  @Prop({ type: Array, required: true }) files!: UploaderFile[]

  removeFile(fileId) {
    this.$emit('remove', fileId)
  }
}
</script>

<style>
.grid-cols-auto-fill {
  grid-template-columns: repeat(auto-fit, 100px);
}
</style>
