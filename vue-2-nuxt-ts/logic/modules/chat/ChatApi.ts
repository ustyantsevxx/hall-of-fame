import { BaseApi } from '~/logic/core/BaseApi'

import {
  ChatEvent,
  ChatMessagesRequestPayload,
  ChatMessagesResponse,
  ChatShow,
  ReadEventPayload,
  SendMessagePayload
} from '.'

export class _ChatApi extends BaseApi {
  getMessages(chatId: number, options: ChatMessagesRequestPayload) {
    return this.get<ChatMessagesResponse>(`chats/${chatId}/messages`, options)
  }

  // getChat(chatId: number): Promise<IApiResponse<ChatShowType>> {
  //   return this.get(`chats/${chatId}`)
  // }

  sendMessage(chatId: number, payload: SendMessagePayload) {
    return this.post<ChatEvent>(`chats/${chatId}/messages`, payload)
  }

  readEvent(chatId: number, options: ReadEventPayload) {
    return this.post<ChatShow>(`chats/${chatId}/events`, options)
  }
}
