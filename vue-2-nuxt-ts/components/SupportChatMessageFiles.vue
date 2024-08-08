<template>
  <div class="space-y-25" style="max-width: 700px">
    <div v-for="file in files" :key="file.id">
      <Link
        v-if="file.status === fileStatuses.FINISHED"
        :href="file.url"
        class="flex content-center items-center space-x-15 cursor-pointer"
        :title="`xx xx '${file.filename}'`"
      >
        <DownloadDocumentSVG />
        <span class="text-white">{{ file.filename }}</span>
      </Link>

      <div v-else class="flex content-center items-center space-x-15">
        <DocumentOutlinedSVG style="fill: white" />
        <span class="text-white">{{ file.filename }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import DocumentOutlinedSVG from '~/assets/svg/document-outlined.svg'
import DownloadDocumentSVG from '~/assets/svg/download-document.svg'
import Link from '~/components/Link.vue'
import { ChatFile } from '~/logic/modules/chat'
import { FILE_STATUSES } from '~/logic/modules/uploader/uploader.constants'

@Component({
  components: {
    Link,
    DownloadDocumentSVG,
    DocumentOutlinedSVG
  }
})
export default class SupportChatMessageFiles extends Vue {
  @Prop({ type: Array, required: true }) files!: ChatFile[]

  fileStatuses = FILE_STATUSES
}
</script>
