<template>
  <div class="space-y-15">
    <div v-for="file in files" :key="file.id" class="flex items-center">
      <div class="relative">
        <DocumentOutlinedSVG />
        <div
          class="absolute top-1/2 left-1/2 w-20 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Progress
            v-if="file.uploadingProgress < 100"
            :progress="file.uploadingProgress"
            stroke-color="#5390BE"
            trail-color="rgba(83, 144, 190, 0.2)"
            :stroke-width="9"
            :trail-width="9"
          />
        </div>
      </div>
      <span class="ml-15 text-blue">{{ file.filename }}</span>
      <button class="ml-10" @click.prevent="removeFile(file.id)">
        <CloseOutlinedCircleSVG />
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import CloseOutlinedCircleSVG from '~/assets/svg/close-outlined-circle.svg'
import DocumentOutlinedSVG from '~/assets/svg/document-outlined.svg'
import Progress from '~/components/Progress.vue'
import { UploaderFile } from '~/logic/modules/uploader'

@Component({
  components: {
    Progress,
    CloseOutlinedCircleSVG,
    DocumentOutlinedSVG
  }
})
export default class FileListDefault extends Vue {
  @Prop({ type: Array, required: true }) files!: UploaderFile[]

  removeFile(fileId) {
    this.$emit('remove', fileId)
  }
}
</script>
