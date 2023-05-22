import axios from 'axios'

import { AuthService } from '../../api/modules/auth/auth.service'

axios.interceptors.response.use(
  ok => ok,
  async error => {
    if (error?.response?.status === 401) {
      AuthService.clearSavedTokens()
      if (typeof window !== undefined) {
        location?.reload?.()
      }
    }
    throw error
  }
)
