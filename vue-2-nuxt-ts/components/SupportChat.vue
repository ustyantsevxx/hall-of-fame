<template>
  <div>
    <div
      class="overflow-hidden relative rounded-20"
      style="height: 570px; background-color: #f3f3f3"
    >
      <div
        id="chat-box"
        ref="chatBox"
        style="height: 570px"
        class="overflow-y-auto overscroll-contain py-34 px-60"
      >
        <ChatBoundaryLoader
          ref="topBoundary"
          :visible="messages.length > 0 && !onFirstPageNow"
        >
          xx xx xx
        </ChatBoundaryLoader>

        <div v-for="group in groupedMessages" :key="group.date">
          <time class="py-34 text-date text-center text-gray uppercase">
            {{ getFormattedGroupDate(group.date) }}
          </time>

          <div class="space-y-12">
            <SupportChatMessage
              v-for="message in group.messages"
              :id="`chat-message__${message.id}`"
              :key="message.id"
              :message="message"
              :data-incoming="!message.isMine"
              :data-messageid="message.id"
              :data-eventid="message.lastEventId"
              @image-clicked="showImageViewer"
              @delete-errored="deleteErroredMessage"
              @send-errored-again="sendErroredAgain"
            />
          </div>
        </div>

        <ChatBoundaryLoader
          ref="bottomBoundary"
          class="pt-34"
          :visible="messages.length > 0 && !onLastPageNow"
        >
          xx xx xx
        </ChatBoundaryLoader>
      </div>

      <Transition name="fade">
        <button
          v-if="bottomScrollMargin > 570 || !onLastPageNow"
          class="absolute bottom-20 left-1/2 px-20 pt-12 pb-13 text-white bg-black bg-opacity-80 rounded-25 transform -translate-x-1/2"
          @click="goToEnd"
        >
          xx xx xx xx
        </button>
      </Transition>
    </div>

    <form
      class="flex items-start mt-40 space-x-30"
      @submit.prevent="trySendMessage"
    >
      <ChatMessageBox
        :message.sync="message"
        :files.sync="files"
        class="flex-1"
        @enter="trySendMessage"
      />
      <Button gradient type="submit" :disabled="!sendAllowed">xx</Button>
    </form>
  </div>
</template>

<script lang="ts">
import 'viewerjs/dist/viewer.css'

import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { api as viewerApi, Viewer } from 'v-viewer'

import Button from '~/components/Button.vue'
import ChatBoundaryLoader from '~/components/ChatBoundaryLoader.vue'
import ChatMessageBox from '~/components/ChatMessageBox.vue'
import SupportChatMessage from '~/components/SupportChatMessage.vue'
import {
  ChatFile,
  ChatMessage,
  ChatMessagesRequestOptions,
  ChatMessagesReturn,
  ChatModule
} from '~/logic/modules/chat'
import { RequestChat } from '~/logic/modules/technical-support'
import { UploaderFile } from '~/logic/modules/uploader'
import { FILE_STATUSES } from '~/logic/modules/uploader/uploader.constants'
import { getUid } from '~/logic/utils'
import { lastItem } from '~/logic/utils/arrays'
import { xDayjs } from '~/logic/utils/datetime'
import {
  getBottomScrollLeft,
  IntersectionObserverService,
  scrollToBottom,
  scrollToElement
} from '~/logic/utils/dom'

let _imageViewerInstance: Viewer

@Component({
  components: {
    ChatBoundaryLoader,
    ChatMessageBox,
    Button,
    SupportChatMessage
  }
})
export default class SupportChat extends Vue {
  @Prop({ type: Object, required: true }) chat!: RequestChat

  bottomScrollMargin = 0

  messages: ChatMessage[] = []
  pendingMessages: any[] = []
  preloadedMessages: ChatMessage[] = []

  topMessageId = -1
  bottomMessageId = -1
  onFirstPageNow = false
  onLastPageNow = false

  latestReadMessageId = -1

  message = ''
  files: UploaderFile[] = []

  get user() {
    return this.$accessor.auth.user
  }

  get groupedMessages() {
    return ChatModule.groupMessagesByDay(
      [...this.messages, ...this.pendingMessages],
      this.user.id
    )
  }

  get chatBoxRef() {
    return this.$refs.chatBox as HTMLElement
  }

  get topBoundaryRef() {
    return (this.$refs.topBoundary as any).$el as HTMLElement
  }

  get bottomBoundaryRef() {
    return (this.$refs.bottomBoundary as any).$el as HTMLElement
  }

  get sendAllowed() {
    return (
      (!!this.message.trim() || this.files.length > 0) && this.allFilesUploaded
    )
  }

  get latestReadMessage() {
    return this.chat.last_read_event?.data
  }

  get authTokenWithoutBearer() {
    return (this.$auth.strategy as any).token.get().split('Bearer ')[1]
  }

  get allFilesUploaded() {
    return this.files.every(file => file.uploadingProgress === 100)
  }

  get chatFiles(): ChatFile[] {
    return this.files.map(file => ({
      id: file.id,
      collection_name: file.collectionName,
      filename: file.filename,
      preview: {
        url: file.url
      },
      status: FILE_STATUSES.CREATED,
      type: '',
      url: file.url
    }))
  }

  created() {
    this.latestReadMessageId = this.latestReadMessage?.id

    ChatModule.connectSocket(this.authTokenWithoutBearer)
    this.subscribeToNewMessages()
    this.subscribeMessageDelete()
    this.subscribeFileUploaded()
    this.subscribeMessageUpdated()
  }

  async mounted() {
    await this.fetchInitialMessages()
    await this.readFirstMessageIfChatJustCreated()

    this.attachInteractionObservers()
    if (this.latestReadMessage) {
      this.scrollToFirstUnreadMessage()
    }
  }

  beforeDestroy() {
    ChatModule.disconnectSocket()
    IntersectionObserverService.detachAllObservers()
  }

  attachInteractionObservers() {
    this.observeTopBoundary()
    this.observeBottomBoundary()
    this.observeBottomScrollMargin()
  }

  async readFirstMessageIfChatJustCreated() {
    if (
      !this.chat.last_read_event &&
      this.messages.length === 1 &&
      lastItem(this.messages).sender.id === this.user.id
    ) {
      await ChatModule.readEvent(
        this.chat.id,
        lastItem(this.messages).last_event.id
      )
    }
  }

  async fetchInitialMessages() {
    let initialMessagesResponse: ChatMessagesReturn

    if (this.latestReadMessage) {
      const { topMessagesResponse, bottomMessagesResponse } =
        await this.loadUnreadRegion()
      initialMessagesResponse = topMessagesResponse

      if (!bottomMessagesResponse && this.messages.length === 0) {
        this.messages = [this.latestReadMessage]
        this.bottomMessageId = this.latestReadMessage.id
      }
    } else {
      initialMessagesResponse = await this.fetchAndMergeMessages({ page: 1 })
      const { totalPages, currentPage, firstId, lastId } =
        initialMessagesResponse
      this.topMessageId = firstId
      this.bottomMessageId = lastId
      this.onLastPageNow = currentPage === totalPages
      this.onFirstPageNow = currentPage === totalPages
    }

    return initialMessagesResponse
  }

  showImageViewer(options: { imageUrls: string[]; startWithIndex: number }) {
    _imageViewerInstance = viewerApi({
      images: options.imageUrls,
      options: {
        initialViewIndex: options.startWithIndex,
        inline: false,
        toolbar: false,
        title: false,
        navbar: true,
        button: true,
        zoomable: true,
        movable: false,
        rotatable: false,
        scalable: true,
        fullscreen: true,
        keyboard: true
      }
    })

    _imageViewerInstance.show(true)
  }

  async preloadMessages(options: ChatMessagesRequestOptions) {
    const { messages } = await ChatModule.getChatMessages(this.chat.id, options)
    this.preloadedMessages = messages
  }

  async goToEnd() {
    if (!this.onLastPageNow) {
      this.applyPreloadedMessages()
    }
    await this.scrollToBottom()
  }

  applyPreloadedMessages() {
    this.messages = this.preloadedMessages
    this.topMessageId = this.preloadedMessages[0].id
    this.onLastPageNow = true
  }

  deleteErroredMessage(uuid: string) {
    this.deleteFromPending(uuid)
  }

  sendErroredAgain(uuid: string) {
    this.sendMessage(this.pendingMessages.find(x => x.uuid === uuid))
    this.deleteFromPending(uuid)
  }

  async fetchAndMergeMessages(options: ChatMessagesRequestOptions) {
    const result = await ChatModule.getChatMessages(this.chat.id, options)
    if (result.lastId > this.latestReadMessageId) {
      this.latestReadMessageId = lastItem(result.messages).id
      await ChatModule.readEvent(
        this.chat.id,
        lastItem(result.messages).last_event.id
      )
    }
    this.mergeMessages(result.messages)
    return result
  }

  mergeMessages(messages: ChatMessage[]) {
    this.messages = [...this.messages, ...messages]
  }

  async fetchMoreTopMessages(beforeId?: number) {
    const result = await this.fetchAndMergeMessages({
      beforeId: beforeId ?? this.topMessageId
    })
    this.topMessageId = result.lastId
    this.onFirstPageNow = result.totalPages === result.currentPage
    return result
  }

  async fetchMoreBottomMessages(afterId?: number) {
    const result = await this.fetchAndMergeMessages({
      afterId: afterId ?? this.bottomMessageId
    })
    this.bottomMessageId = result.lastId
    this.onLastPageNow = result.totalPages === result.currentPage
    return result
  }

  async loadUnreadRegion() {
    const topMessagesResponse = await this.fetchMoreTopMessages(
      this.latestReadMessage.id
    )
    const bottomMessagesResponse =
      topMessagesResponse.messages.length === 0
        ? null
        : await this.fetchMoreBottomMessages(topMessagesResponse.firstId)
    return { topMessagesResponse, bottomMessagesResponse }
  }

  getMessageElement(id: number) {
    return document.querySelector(`#chat-message__${id}`) as HTMLElement
  }

  getFirstUnreadIncomingMessageElement() {
    const lastReadMessageElement = this.getMessageElement(
      this.latestReadMessage.id
    )

    let firstUnreadIncomingMessageElement =
      lastReadMessageElement?.nextSibling as any

    while (
      firstUnreadIncomingMessageElement &&
      !firstUnreadIncomingMessageElement?.dataset?.incoming
    ) {
      firstUnreadIncomingMessageElement =
        firstUnreadIncomingMessageElement?.nextSibling
    }

    return firstUnreadIncomingMessageElement ?? lastReadMessageElement
  }

  scrollToFirstUnreadMessage() {
    const chatBoxPadding = 30
    const elementToScrollTo = this.getFirstUnreadIncomingMessageElement()
    if (elementToScrollTo) {
      scrollToElement(elementToScrollTo, this.chatBoxRef, chatBoxPadding)
    }
  }

  calculateBottomScrollMargin() {
    this.bottomScrollMargin = getBottomScrollLeft(this.chatBoxRef)
  }

  observeBottomScrollMargin() {
    this.chatBoxRef.addEventListener('scroll', () =>
      this.calculateBottomScrollMargin()
    )
    this.calculateBottomScrollMargin()
  }

  async scrollToBottom() {
    await this.$nextTick()
    scrollToBottom(this.chatBoxRef)
    await this.$nextTick()
  }

  deleteFromPending(uuid: string) {
    this.pendingMessages = this.pendingMessages.filter(x => x.uuid !== uuid)
  }

  subscribeToNewMessages() {
    ChatModule.subscribeToNewMessages(this.chat.id, async data => {
      if (data.data.sender.id === this.user.id) {
        this.deleteFromPending(data.uuid)
      } else {
        await this.scrollToBottom()
      }

      if (!this.onLastPageNow) {
        this.preloadedMessages.push(data.data)
      } else {
        this.messages.push(data.data)
      }

      await ChatModule.readEvent(this.chat.id, data.id)

      if (data.data.sender.id !== this.user.id) {
        await this.scrollToBottom()
      }
    })
  }

  subscribeMessageDelete() {
    ChatModule.subscribeMessagesDelete(this.chat.id, data => {
      this.messages = this.messages.filter(
        message => message.id !== data.data.id
      )
      this.preloadedMessages = this.preloadedMessages.filter(
        message => message.id !== data.data.id
      )
    })
  }

  subscribeMessageUpdated() {
    ChatModule.subscribeMessageUpdated(this.chat.id, data => {
      const message = data.data
      this.replaceMessage(message.id, message)
    })
  }

  subscribeFileUploaded() {
    // refactor me (move subscriptions in one place)
    ChatModule.subscribeFileUploaded(this.chat.id, data => {
      const message = data.data
      this.replaceMessage(message.id, message)
    })
  }

  replaceMessage(messageId: number, message: ChatMessage) {
    // refactor me
    const messageToReplaceIndex = this.messages.findIndex(
      m => m.id === messageId
    )
    if (messageToReplaceIndex !== -1) {
      this.$set(this.messages, messageToReplaceIndex, message)
    } else {
      const preloadedMessagesIndexToReplace = this.preloadedMessages.findIndex(
        m => m.id === messageId
      )
      if (preloadedMessagesIndexToReplace !== -1) {
        this.$set(this.preloadedMessages, messageToReplaceIndex, message)
      }
    }
  }

  getFormattedGroupDate(unixTimestamp: number) {
    return xDayjs.unix(unixTimestamp).format('DD MMMM YYYY')
  }

  observeTopBoundary() {
    IntersectionObserverService.attachObserver(
      this.topBoundaryRef,
      () => this.fetchMoreTopMessages(),
      {
        root: this.chatBoxRef,
        rootMargin: '1500px 0px 0px',
        threshold: 0
      }
    )
  }

  observeBottomBoundary() {
    IntersectionObserverService.attachObserver(
      this.bottomBoundaryRef,
      () => this.fetchMoreBottomMessages(),
      {
        root: this.chatBoxRef,
        rootMargin: '0px 0px 1500px',
        threshold: 0
      }
    )
  }

  trySendMessage() {
    if (this.sendAllowed) {
      this.sendMessage()
    }
  }

  async sendMessage(existingMessage: any = null) {
    const uuid = getUid()

    const newMessage = existingMessage
      ? { ...existingMessage, error: false, __pending: true, uuid }
      : {
          id: null,
          uuid,
          __pending: true,
          message: this.message,
          files: this.chatFiles,
          sender: { id: this.user.id },
          created_at: xDayjs().unix(),
          updated_at: xDayjs().unix(),
          wasEdited: false,
          error: false
        }

    if (existingMessage) {
      const index = this.pendingMessages.findIndex(
        m => m.uuid === existingMessage.uuid
      )
      if (index > -1) {
        this.pendingMessages[index] = newMessage
      }
    } else {
      this.pendingMessages.push(newMessage)
    }

    await this.goToEnd()

    const messageToSend = existingMessage?.message ?? this.message
    const fileIds = existingMessage?.files ?? this.files.map(file => file.id)
    this.message = ''
    this.files = []

    const { success } = await ChatModule.sendMessage({
      chatId: this.chat.id,
      message: messageToSend,
      fileIds,
      uuid
    })

    if (!success) {
      newMessage.__pending = false
      newMessage.error = true
    }
  }
}
</script>

<style>
body.viewer-open {
  overflow: unset !important;
}
</style>
