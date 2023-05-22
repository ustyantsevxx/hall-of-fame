import { groupBy, isEqual } from 'lodash-es'

import { MsmsService } from '~/logic/modules/msms/msms.service'
import { TRACE_REQUEST_COMPLEXITY_LEVELS } from '~/logic/modules/trace-requests/trace-requests.constants'
import { TraceRequestsService } from '~/logic/modules/trace-requests/trace-requests.service'
import { timeStringToSeconds } from '~/logic/utils/datetime'

const getEmptyRequestData = () => ({
  msm: null,
  selectedSscIndexes: [],
  selectedModules: [],
  selectedValues: [],
  name: '',
  date: null,
  timestamp: null,
  duration: {
    minutes: 10,
    seconds: 0
  }
})

const defaultRequestStateData = getEmptyRequestData()

const selectedModulesToSscsRequestValue = selectedModules => {
  return Object.entries(groupBy(selectedModules, m => m.sscIndex)).map(
    ([sscIndex, modules]) => ({
      slot: +sscIndex,
      modules_slots: modules.map(m => m.moduleIndex)
    })
  )
}

/**
 * @param {*} date dayjs object
 * @param {*} timestamp  timestring
 * @returns unix timestamp
 */
const getFrom = (date, timestamp) => {
  return date.add(timeStringToSeconds(timestamp), 'seconds').unix()
}

const getCreateRequestBody = stateData => {
  return {
    duration: stateData.duration.minutes * 60 + stateData.duration.seconds,
    from: getFrom(stateData.date, stateData.timestamp),
    sscs: selectedModulesToSscsRequestValue(stateData.selectedModules),
    msm_id: stateData.msm.id,
    variables: stateData.selectedValues.map(v => v.name),
    name: stateData.name
  }
}

const getComplexityRequestBody = stateData => {
  const duration = stateData.duration.minutes * 60 + stateData.duration.seconds
  return {
    duration,
    variables: stateData.selectedValues.map(v => v.name),
    sscs: selectedModulesToSscsRequestValue(stateData.selectedModules)
  }
}

export const state = () => ({
  msms: [],
  complexityLevel: TRACE_REQUEST_COMPLEXITY_LEVELS.LOW,
  size: 0,
  data: getEmptyRequestData()
})

export const getters = {
  selectedItemsCount(state) {
    return (
      state.data.selectedSscIndexes.length + state.data.selectedModules.length
    )
  },

  complexityIsTooHigh(state) {
    return state.complexityLevel === TRACE_REQUEST_COMPLEXITY_LEVELS.HIGH
  },

  fromAsUnix(state) {
    return getFrom(state.data.date, state.data.timestamp)
  },

  anyDataChanged(state) {
    return !isEqual(state.data, defaultRequestStateData)
  }
}

export const mutations = {
  SET_MSMS(state, payload) {
    state.msms = payload
  },

  SET_MSM(state, payload) {
    state.data.msm = payload
  },

  SET_SELECTED_MODULES(state, payload) {
    state.data.selectedModules = payload
  },

  SET_SELECTED_SSC_IDS(state, payload) {
    state.data.selectedSscIndexes = payload
  },

  SET_SELECTED_VALUES(state, payload) {
    state.data.selectedValues = payload
  },

  SET_NAME(state, payload) {
    state.data.name = payload
  },

  SET_DATE(state, payload) {
    state.data.date = payload
  },

  SET_TIMESTAMP(state, payload) {
    state.data.timestamp = payload
  },

  SET_DURATION(state, payload) {
    state.data.duration = payload
  },

  RESET_REQUEST_DATA(state) {
    Object.assign(state.data, getEmptyRequestData())
  },

  SET_SIZE(state, payload) {
    state.size = payload
  },

  SET_COMPLEXITY_LEVEL(state, payload) {
    state.complexityLevel = payload
  }
}

export const actions = {
  async fetchMsms({ commit }) {
    const msms = await MsmsService.getAllMsms()
    commit('SET_MSMS', msms)
  },

  async calculateComplexity({ commit, state: { data } }) {
    const { value, level } = await TraceRequestsService.calculateComplexity(
      getComplexityRequestBody(data)
    )

    commit('SET_SIZE', value)
    commit('SET_COMPLEXITY_LEVEL', level)
  },

  async createTraceRequest({ state: { data } }) {
    const body = getCreateRequestBody(data)

    const { success, errors } = await TraceRequestsService.createTraceRequest(
      body
    )

    return success ? { success } : { errors }
  }
}
