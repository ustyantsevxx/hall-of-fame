import {
  BCC_ITEMS_MAP,
  MSM_ITEMS_MAP,
  SSC_ITEMS_MAP,
  T_ITEMS_MAP
} from '~/logic/constants'

export const TRACE_REQUESTS_STATUSES = {
  NEW: 'new',
  RECEIVED: 'received',
  ACCEPTED: 'accepted',
  PROCESSED: 'processed',
  VIEWED: 'viewed',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
  CANCELED: 'canceled',
  CANCEL_RECEIVED: 'cancel_received'
}

export const TRACE_REQUEST_ACTIONS = {
  COPY: 'COPY',
  DELETE: 'DELETE',
  DOWNLOAD_CSV: 'DOWNLOAD_CSV',
  COMPLETE: 'COMPLETE',
  ARCHIVE: 'ARCHIVE',
  OPEN: 'OPEN',
  CANCEL: 'CANCEL',
  UNARCHIVE: 'UNARCHIVE',
  RETURN: 'RETURN'
}

export const TRACE_REQUEST_COMPLEXITY_LEVELS = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high'
}

const A = TRACE_REQUEST_ACTIONS

export const TRACE_REQUEST_ACTIONS_BY_STATUS = {
  [TRACE_REQUESTS_STATUSES.ACCEPTED]: {
    primary: A.CANCEL,
    secondary: [
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE
    ]
  },

  [TRACE_REQUESTS_STATUSES.ARCHIVED]: {
    primary: A.UNARCHIVE,
    secondary: [
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE
    ]
  },

  [TRACE_REQUESTS_STATUSES.CANCELED]: {
    primary: A.RETURN,
    secondary: [
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE
    ]
  },

  [TRACE_REQUESTS_STATUSES.CANCEL_RECEIVED]: {
    primary: A.RETURN,
    secondary: [
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE
    ]
  },

  [TRACE_REQUESTS_STATUSES.COMPLETED]: {
    primary: A.OPEN,
    secondary: [
      A.DOWNLOAD_CSV,
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE,
      A.ARCHIVE
    ]
  },

  [TRACE_REQUESTS_STATUSES.NEW]: {
    primary: A.CANCEL,
    secondary: [
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE
    ]
  },

  [TRACE_REQUESTS_STATUSES.PROCESSED]: {
    primary: A.OPEN,
    secondary: [
      A.DOWNLOAD_CSV,
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE
    ]
  },

  [TRACE_REQUESTS_STATUSES.RECEIVED]: {
    primary: A.CANCEL,
    secondary: [
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE
    ]
  },

  [TRACE_REQUESTS_STATUSES.VIEWED]: {
    primary: A.OPEN,
    secondary: [
      A.DOWNLOAD_CSV,
      // TODO: uncomment when api is ready
      // A.COPY,
      A.DELETE,
      A.COMPLETE
    ]
  }
}

export const CREATE_MSM_VALUES = Object.entries(MSM_ITEMS_MAP)
  .filter(([name]) => name !== 'm00')
  .map(([name, description]) => ({
    name,
    description
  }))

export const CREATE_T_VALUES = Object.entries(T_ITEMS_MAP)
  .filter(([name]) => name !== 't00')
  .map(([name, description]) => ({ name, description }))

export const CREATE_BCC_VALUES = Object.entries(BCC_ITEMS_MAP)
  .filter(([name]) => name !== 'b00')
  .map(([name, description]) => ({
    name,
    description
  }))

export const CREATE_SSC_VALUES = Object.entries(SSC_ITEMS_MAP)
  .filter(([name]) => name !== 's00')
  .map(([name, description]) => ({
    name,
    description
  }))
