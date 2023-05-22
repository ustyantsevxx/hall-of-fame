import axios from 'axios'

import { AuthService } from '@/api/modules/auth'
import { axiosRuntimeSettings } from '@/core/settings'
import { router } from '@/router'
import { useUserStore } from '@/stores/user'

export const attachAxiosInterceptors = () => {
  axios.interceptors.response.use(
    ok => ok,
    async error => {
      if (axiosRuntimeSettings.useBadTokenLogoutInterceptor) {
        if (error.response.status === 401) {
          const refreshSuccess = await AuthService.refreshToken()

          if (refreshSuccess) {
            return true
          } else {
            const userStore = useUserStore()
            AuthService.clearSavedTokens()
            userStore.user = undefined
            await router.push('/auth/login')
          }
        }

        if (error.response.status === 403) {
          const userStore = useUserStore()
          AuthService.clearSavedTokens()
          userStore.user = undefined
          await router.push('/auth/login')
        }
      }
    }
  )
}
