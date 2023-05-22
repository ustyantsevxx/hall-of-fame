import { MsmsService } from '~/logic/modules/msms/msms.service'

export const state = () => ({
  chemistryList: null,
  msmList: null
})

export const mutations = {
  SET_CHEMISTRY_LIST(state, chemistryList) {
    state.chemistryList = chemistryList
  },

  SET_MSM_LIST(state, msmList) {
    state.msmList = msmList
  }
}

export const actions = {
  async fetchMsmList({ commit }) {
    const msmList = await MsmsService.getAllMsms()
    commit('SET_MSM_LIST', msmList)
  },

  clearMsmList({ commit }) {
    commit('SET_MSM_LIST', null)
  }
}
