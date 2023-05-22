import { CURRENT_ROLE, ROLES } from '~/logic/core/runtime'
import { BadgesService } from '~/logic/modules/badges/badges.service'

export const state = () => ({
  completedTraceRequestsCount: 0
})

export const mutations = {
  SET_COMPLETED_TRACE_REQUESTS_COUNT(state, payload) {
    state.completedTraceRequestsCount = payload
  }
}

export const actions = {
  async fetchAuthenticatedUserData({ dispatch }) {
    if (CURRENT_ROLE === ROLES.ENGINEER) {
      await dispatch('fetchCompletedTraceRequestsCount')
    }
  },

  async fetchCompletedTraceRequestsCount({ commit }) {
    const counters = await BadgesService.getCounters()
    commit(
      'SET_COMPLETED_TRACE_REQUESTS_COUNT',
      counters.trace_logs_completed_count
    )
  }
}
