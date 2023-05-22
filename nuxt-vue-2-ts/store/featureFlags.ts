import { keyBy } from 'lodash-es'
import { actionTree, mutationTree } from 'nuxt-typed-vuex'
import { UnleashClient } from 'unleash-proxy-client'

import { isDefined } from '~/logic/utils'

export const state = () => ({
  rubleCardsEditing: false,
  monthStartFundsVisible: false
})

export const mutations = mutationTree(state, {
  SET_FLAG(state, { flagName, value }) {
    state[flagName] = value
  }
})

export const actions = actionTree(
  { state, mutations },
  {
    updateFeatureFlags({ state, commit }, client: UnleashClient) {
      const flags = keyBy(client.getAllToggles(), toggle => toggle.name)
      for (const stateFlagKey of Object.keys(state)) {
        if (isDefined(flags[stateFlagKey])) {
          commit('SET_FLAG', {
            flagName: stateFlagKey,
            value: flags[stateFlagKey].enabled
          })
        }
      }
    }
  }
)
