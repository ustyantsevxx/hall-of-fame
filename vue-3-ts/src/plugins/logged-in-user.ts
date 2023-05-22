import { Pinia } from 'pinia'

import { AuthService } from '@/api/modules/auth'
import { UsersService } from '@/api/modules/users'
import { useUserStore } from '@/stores/user'

/**
 * @param piniaStore root Pinia store instance. needed because this function is called before "app.use(piniaStore)"
 */
export const tryGetLoggedInUser = async (piniaStore: Pinia) => {
  const tokenApplied = AuthService.applySavedToken()
  if (tokenApplied) {
    const userStore = useUserStore(piniaStore)
    userStore.user = await UsersService.getMe()
  }
}
