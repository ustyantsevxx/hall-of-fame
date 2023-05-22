import { _ChatApi } from '~/logic/modules/chat/ChatApi'
import { _ChatService } from '~/logic/modules/chat/ChatService'
import { httpClient } from '~/logic/modules/container'

export const ChatModule = new _ChatService(
  new _ChatApi({
    namespace: 'chat_module',
    httpClient
  })
)

// export * from '~/logic/modules/chat/chat.constants'
export * from '~/logic/modules/chat/chat.types'
