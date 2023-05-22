import { groupBy, sortBy } from 'lodash-es'
import io from 'socket.io-client'

import { RUNTIME_VARS } from '~/logic/constants/core'
import { BaseService } from '~/logic/core/BaseService'
import { _ChatApi } from '~/logic/modules/chat/ChatApi'
import { SOCKET_EVENTS } from '~/logic/modules/technical-support'
import { lastItem } from '~/logic/utils/arrays'
import { xDayjs } from '~/logic/utils/datetime'

import {
  ChatMessage,
  ChatMessageGroup,
  ChatMessagesRequestOptions,
  ChatMessagesReturn,
  SendMessageOptions
} from '.'

export class _ChatService extends BaseService<_ChatApi> {
  socket: any

  // async getChat(chatId) {
  //   const a = await this.api.getChat(chatId)
  //   return a.data
  // }

  async getChatMessages(
    chatId,
    options: ChatMessagesRequestOptions
  ): Promise<ChatMessagesReturn> {
    const {
      data: { data: response }
    } = await this.api.getMessages(chatId, {
      per_page: options.perPage ?? 25,
      page: options.page,
      before_message_id: options.beforeId ?? undefined,
      after_message_id: options.afterId ?? undefined,
      load_to_per_page: options.fillToPerPage
    })

    return {
      messages: response.items,
      firstId: response.items[0]?.id,
      lastId: lastItem(response.items)?.id,
      totalPages: response.meta.last_page,
      currentPage: response.meta.current_page
    }
  }

  groupMessagesByDay(
    messages: ChatMessage[],
    currentUserId: number
  ): ChatMessageGroup[] {
    const messagesGroupedByDays: {
      date: string
      messages: (ChatMessage & {
        __pending?: boolean
        error?: boolean
        uuid?: string
      })[]
    }[] = [
      ...Object.entries(
        groupBy(messages, x => xDayjs.unix(x.created_at).startOf('day').unix())
      )
    ]
      .sort(([timestampA], [timestampB]) => +timestampA - +timestampB)
      .map(([date, messages]) => ({
        date: +date,
        messages
      })) as any

    return messagesGroupedByDays.map(group => ({
      date: group.date,
      messages: sortBy(
        [
          ...group.messages.map(message => ({
            id: message.id,
            __pending: message.__pending,
            isMine: message.sender.id === currentUserId,
            createdAt: message.created_at,
            wasEdited: message.created_at !== message.updated_at,
            files: message.files,
            text: message.message,
            lastEventId: message.last_event?.id,
            error: message.error,
            uuid: message.uuid
          }))
        ],
        ['createdAt', 'id']
      )
    })) as any
  }

  connectSocket(accessTokenWithoutBearer: string) {
    if (this.socket) {
      return
    }

    this.socket = io(RUNTIME_VARS.API_HOST, {
      transports: ['websocket'],
      query: { token: accessTokenWithoutBearer }
    })
  }

  disconnectSocket() {
    if (!this.socket) {
      return
    }

    this.socket.disconnect()
    this.socket = undefined
  }

  subscribeToNewMessages(
    chatId: number,
    eventCallback: (eventData: any) => any
  ) {
    this.socket.on(SOCKET_EVENTS.MESSAGE_CREATED, eventData => {
      if (eventData.chat_id === chatId) {
        return eventCallback(eventData)
      }
    })
  }

  subscribeFileUploaded(
    chatId: number,
    eventCallback: (eventData: any) => any
  ) {
    this.socket.on(SOCKET_EVENTS.FILE_UPLOADED, eventData => {
      if (eventData.chat_id === chatId) {
        return eventCallback(eventData)
      }
    })
  }

  subscribeMessageUpdated(
    chatId: number,
    eventCallback: (eventData: any) => any
  ) {
    this.socket.on(SOCKET_EVENTS.MESSAGE_UPDATED, eventData => {
      if (eventData.chat_id === chatId) {
        return eventCallback(eventData)
      }
    })
  }

  subscribeMessagesDelete(
    chatId: number,
    eventCallback: (eventData: any) => any
  ) {
    this.socket.on(SOCKET_EVENTS.MESSAGE_DELETED, eventData => {
      if (eventData.chat_id === chatId) {
        return eventCallback(eventData)
      }
    })
  }

  async sendMessage(options: SendMessageOptions) {
    const { status } = await this.api.sendMessage(options.chatId, {
      message: options.message,
      temporary_file_ids: options.fileIds,
      uuid: options.uuid
    })

    return { success: status === 200 }
  }

  async readEvent(chatId: number, latestEventId: number) {
    await this.api.readEvent(chatId, {
      last_known_event_id: latestEventId
    })
  }
}
