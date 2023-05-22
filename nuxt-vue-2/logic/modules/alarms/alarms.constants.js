const ALARM_TYPE_KEYS = {
  ERROR: 'error',
  WARNING: 'warning',
  FAULT: 'fault',
  NOTIFICATION: 'notification'
}

export const ALARM_TYPES = {
  [ALARM_TYPE_KEYS.NOTIFICATION]: {
    color: '#CCCCCC',
    display: 'Notification'
  },
  [ALARM_TYPE_KEYS.ERROR]: {
    color: '#EA7F48',
    display: 'Error'
  },
  [ALARM_TYPE_KEYS.WARNING]: {
    color: '#E9ED0F',
    display: 'Warning'
  },
  [ALARM_TYPE_KEYS.FAULT]: {
    color: '#FF4C4A',
    display: 'Fault'
  }
}

export const ALARM_STATUS_KEYS = {
  ACTIVE: 'active',
  ARCHIVED: 'archived',
  CLOSED: 'closed'
}

export const ALARM_STATUSES = {
  [ALARM_STATUS_KEYS.ACTIVE]: { display: 'Active' },
  [ALARM_STATUS_KEYS.ARCHIVED]: { display: 'Archived' },
  [ALARM_STATUS_KEYS.CLOSED]: { display: 'Closed' }
}

export const ALARM_ACTIONS = {
  DOWNLOAD_CSV: 'DOWNLOAD_CSV',
  CLOSE: 'CLOSE',
  ARCHIVE: 'ARCHIVE'
}

const A = ALARM_ACTIONS

export const ALARM_ACTIONS_BY_STATUS = {
  [ALARM_STATUS_KEYS.ACTIVE]: {
    secondary: [A.DOWNLOAD_CSV, A.CLOSE]
  },
  [ALARM_STATUS_KEYS.CLOSED]: {
    secondary: [A.DOWNLOAD_CSV, A.ARCHIVE]
  },
  [ALARM_STATUS_KEYS.ARCHIVED]: {
    secondary: [A.DOWNLOAD_CSV]
  }
}
