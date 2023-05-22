import { keyBy } from 'lodash-es'
import { defineStore } from 'pinia'
import { UnleashClient } from 'unleash-proxy-client'

export const useFeatureFlagsStore = defineStore('Feature flags', {
  state: () => ({}),

  actions: {
    updateFeatureFlags(client: UnleashClient) {
      const flags = keyBy(client.getAllToggles(), toggle => toggle.name)
      for (const stateFlagKey of Object.keys(this.$state)) {
        this.$state[stateFlagKey] = flags[stateFlagKey]?.enabled
      }
    }
  }
})
