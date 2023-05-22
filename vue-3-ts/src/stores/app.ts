import { defineStore } from 'pinia'

import { Timer } from '@/api/modules/timers/types'

type AppStoreState = {
  drawerOpened: boolean
  activeTimer: Timer | null
}

export const useAppStore = defineStore('app', {
  state: () =>
    ({
      drawerOpened: false,
      activeTimer: null
    } as AppStoreState)
})
