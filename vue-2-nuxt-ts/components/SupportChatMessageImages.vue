<template>
  <div
    class="grid gap-10"
    :class="`grid-cols-${Math.min(3, images.length)}`"
    style="max-width: 700px"
  >
    <figure
      v-for="(image, i) in images"
      :key="image.id"
      style="width: 220px; height: 160px"
      class="relative"
      tabindex="0"
      @keypress.enter.space.prevent="() => emitImageClickedIfLoaded(image, i)"
      @click="() => emitImageClickedIfLoaded(image, i)"
    >
      <Skeleton
        v-if="!imageLoaded[image.id]"
        height="160px"
        width="220px"
        class="absolute inset-0"
      />
      <img
        :src="getImageThumbnail(image)"
        :alt="imageLoaded[image.id] ? image.filename : ''"
        :class="{
          'opacity-0': !imageLoaded[image.id],
          'cursor-pointer': imageLoaded[image.id]
        }"
        class="object-cover rounded-10"
        style="width: 220px; height: 160px"
        @load="handleImageLoaded(image)"
      />
    </figure>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { Skeleton } from 'vue-loading-skeleton'

import { ChatFile } from '~/logic/modules/chat'
import { FILE_STATUSES } from '~/logic/modules/uploader/uploader.constants'

// @ts-ignore
@Component({
  components: {
    Skeleton
  }
})
export default class SupportChatMessageImages extends Vue {
  @Prop({ type: Array, required: true }) images!: ChatFile[]

  loadedImages: ChatFile[] = []
  fileStatuses = FILE_STATUSES

  get imageLoaded() {
    return Object.fromEntries(this.loadedImages.map(image => [image.id, true]))
  }

  handleImageLoaded(image) {
    this.loadedImages.push(image)
  }

  isImageLoaded(image: ChatFile): boolean {
    return (
      image.status === this.fileStatuses.FINISHED &&
      this.loadedImages.some(l => l.id === image.id)
    )
  }

  getImageThumbnail(image) {
    return image?.preview?.url || image.url
  }

  emitImageClickedIfLoaded(image: ChatFile, startWithIndex: number) {
    if (this.isImageLoaded(image)) {
      this.$emit('image-clicked', {
        imageUrls: this.images.map(image => image.url),
        startWithIndex
      })
    }
  }
}
</script>

<style scoped>
::v-deep .pu-skeleton {
  @apply rounded-10;
  line-height: 2 !important;
}
</style>
