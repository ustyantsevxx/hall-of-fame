<template>
  <div class="flex" :class="{ 'justify-end': message.isMine }">
    <div>
      <div
        class="py-20 px-30 rounded-20"
        :class="{
          'bg-purple rounded-bl-0': !message.isMine,
          'bg-blue rounded-br-0': message.isMine
        }"
        style="max-width: 755px"
      >
        <div class="flex justify-between items-center space-x-20">
          <p class="text-description text-white">{{ senderName }}</p>
          <time class="text-white text-opacity-50">{{ sendTime }}</time>
        </div>

        <div class="space-y-15">
          <p
            class="mt-12 text-white whitespace-pre-line break-words"
            v-html="message.text"
          ></p>

          <SupportChatMessageImages
            v-if="images.length > 0"
            :images="images"
            @image-clicked="bubbleImageClicked"
          />
          <SupportChatMessageFiles v-if="files.length > 0" :files="files" />
        </div>
      </div>

      <p v-if="!message.error" class="mt-2 h-20 text-description text-gray-300">
        <span v-if="message.__pending">Идет отправка...</span>
        <span v-if="message.wasEdited">Изменено</span>
      </p>

      <SupportChatMessageError
        v-else
        class="mt-13"
        @delete="deleteErroredMessage"
        @send-again="sendErroredAgain"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

import ErrorCircledSVG from '~/assets/svg/error-circled.svg'
import SupportChatMessageError from '~/components/SupportChatMessageError.vue'
import SupportChatMessageFiles from '~/components/SupportChatMessageFiles.vue'
import SupportChatMessageImages from '~/components/SupportChatMessageImages.vue'
import { MessageFromGroup } from '~/logic/modules/chat/chat.types'
import {
  ACCEPTABLE_FILE_TYPES,
  FILE_COLLECTIONS
} from '~/logic/modules/uploader'
import { xDayjs } from '~/logic/utils/datetime'

@Component({
  components: {
    SupportChatMessageError,
    SupportChatMessageFiles,
    SupportChatMessageImages,
    ErrorCircledSVG
  }
})
export default class SupportChatMessage extends Vue {
  @Prop({ type: Object, required: true }) message!: MessageFromGroup

  get files() {
    const fileCollection = FILE_COLLECTIONS[1].name
    const applicationMimeTypes = ACCEPTABLE_FILE_TYPES.application

    return this.message.files.filter(file => {
      const fileType: string = file.type
      return (
        file.collection_name === fileCollection ||
        applicationMimeTypes.includes(fileType)
      )
    })
  }

  get images() {
    const fileCollection = FILE_COLLECTIONS[0].name
    const imageMimeTypes = ACCEPTABLE_FILE_TYPES.image

    return this.message.files.filter(file => {
      const fileType: string = file.type
      return (
        file.collection_name === fileCollection ||
        imageMimeTypes.includes(fileType)
      )
    })
  }

  get fullName() {
    return this.$accessor.fullName
  }

  get senderName() {
    return this.message.isMine ? this.fullName : 'Администратор'
  }

  get sendTime() {
    return xDayjs.unix(this.message.createdAt).format('HH:mm')
  }

  bubbleImageClicked(args: any) {
    this.$emit('image-clicked', args)
  }

  deleteErroredMessage() {
    this.$emit('delete-errored', this.message.uuid)
  }

  sendErroredAgain() {
    this.$emit('send-errored-again', this.message.uuid)
  }
}
</script>
