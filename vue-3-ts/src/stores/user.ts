import { defineStore } from 'pinia'

import { User } from '@/api/shared/types'

type UserStoreState = {
  user?: User
}

export const useUserStore = defineStore('user', {
  state: () =>
    ({
      user: undefined
    } as UserStoreState),

  getters: {
    loggedIn(state) {
      return state.user !== undefined
    }
  }
})
