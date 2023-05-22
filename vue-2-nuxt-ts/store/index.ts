import {
  actionTree,
  getAccessorType,
  getterTree,
  mutationTree
} from 'nuxt-typed-vuex'

import { BonusCard, BonusCardsModule } from '~/logic/modules/bonus-cards'
import { User } from '~/logic/modules/users'
import * as featureFlags from '~/store/featureFlags'

export type AuthState = { user: User; loggedIn: boolean }

export type State = {
  auth: AuthState
  bonusCards: BonusCard[]
  activeAnnouncement: string
}

export const state = (): State => ({
  auth: {} as AuthState,
  bonusCards: [],
  activeAnnouncement: ''
})

export const getters = getterTree(state, {
  fullName(state) {
    if (state.auth.user) {
      const { first_name, last_name, patronymic } = state.auth.user
      const nameParts = [last_name, first_name, patronymic].map(p => p || '')
      return nameParts.join(' ')
    }
    return null
  }
})

export const mutations = mutationTree(state, {
  SET_BONUS_CARDS(state, payload) {
    state.bonusCards = payload
  },

  SET_ACTIVE_ANNOUNCEMENT(state, payload) {
    state.activeAnnouncement = payload
  }
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    async fetchUserData({ dispatch }) {
      await Promise.all([dispatch('fetchBonusCards')])
    },

    async fetchBonusCards({ commit }) {
      const bonusCards = await BonusCardsModule.getBonusCards()
      commit('SET_BONUS_CARDS', bonusCards)
    }
  }
)

export const accessorType = getAccessorType({
  actions,
  getters,
  mutations,
  state,
  modules: { featureFlags }
})
