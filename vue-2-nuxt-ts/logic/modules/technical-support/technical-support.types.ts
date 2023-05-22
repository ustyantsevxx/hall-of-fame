import { ChatMessage } from '~/logic/modules/chat'
import { Topic } from '~/logic/modules/technical-support-topics'

export interface RequestStation {
  id: number
  name: string
  address: string
}

export interface RequestStatus {
  id: number
  name: string
  name_translate: string
}

export interface RequestTopic {
  id: number
  name: string
}

export interface ShortRequest {
  id: number
  created_at: number
  unread_message_count: number
  last_message_text: string
  status: RequestStatus
  station: RequestStation
  topic: Topic
}

export interface RequestLastReadEvent {
  id: number
  type: string
  data: ChatMessage
  created_at: number
  chat_id: number
}

export interface RequestChat {
  id: number
  name: string
  unread_message_count: number
  last_read_event: RequestLastReadEvent
}

export interface Request {
  id: number
  status: RequestStatus
  station: RequestStation
  topic: RequestTopic
  chat: RequestChat
}

export interface RequestsRequestParams {
  page?: number
  per_page?: number
}

export interface RequestsResponse {
  data: ShortRequest[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface StoreRequestPayload {
  station_id?: number
  topic_id?: number
  topic_name?: string
  message?: string
  temporary_file_ids?: number[]
}
