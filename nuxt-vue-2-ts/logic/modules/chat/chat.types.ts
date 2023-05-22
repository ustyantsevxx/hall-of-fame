import { MetaPagination } from '~/logic/types/api-meta'

export interface MessageFromGroup {
  id: number
  isMine: boolean
  __pending: boolean | undefined
  createdAt: number
  wasEdited: boolean
  lastEventId?: number
  files: any[]
  text: string
  error?: boolean
  uuid?: string
}

export interface ChatMessageGroup {
  date: number
  messages: MessageFromGroup[]
}

export interface ChatMessagesRequestOptions {
  page?: number
  beforeId?: number
  afterId?: number
  fillToPerPage?: boolean
  perPage?: number
}

export interface ChatMessagesRequestPayload {
  per_page?: number
  page?: number
  after_message_id?: number
  load_to_per_page?: boolean
  before_message_id?: number
}

export interface ChatMessageSender {
  id: number
  name: string
  email: string
}

export interface ChatMessageLastEvent {
  id: number
  type: string
  created_at: number
  chat_at: number
}

export interface ChatFile {
  id: number
  url: string
  collection_name: string
  filename: string
  type: string
  status: string
  preview: object
}

export interface ChatMessage {
  id: number
  message: string
  files: ChatFile[]
  sender: ChatMessageSender
  last_event: ChatMessageLastEvent
  created_at: number
  updated_at: number
}

export interface ChatMessagesResponseData {
  items: ChatMessage[]
  meta: MetaPagination
}

export interface ChatMessagesResponse {
  status: boolean
  data: ChatMessagesResponseData
}

export interface ChatEventSender {
  id: number
  name: string
  email: string
}

export interface ChatEventMessage {
  id: number
  message: string
  files: ChatFile[]
  sender: ChatEventSender
  created_at: number
  updated_at?: number
}

export interface ChatEvent {
  id: number
  type: string
  data: ChatEventMessage
  created_at: number
  chat_at: number
}

export interface SendMessagePayload {
  message?: string
  uuid?: string
  temporary_file_ids?: number[]
}

export interface ChatShow {
  id: number
  name: string
  last_read_event?: ChatEvent
  unread_message_count: number
}

export interface ReadEventPayload {
  last_known_event_id: number
}

export interface ChatMessagesReturn {
  messages: ChatMessage[]
  currentPage: number
  lastId: number
  firstId: number
  totalPages: number
}

export interface SendMessageOptions {
  chatId: number
  message?: string
  uuid?: string
  fileIds?: number[]
}
