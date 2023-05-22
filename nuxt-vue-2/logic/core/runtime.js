export const ROLES = {
  ENGINEER: 'engineer',
  CUSTOMER: 'customer'
}

export const ROLE_ENV_NAMES = {
  [ROLES.ENGINEER]: 'engineer',
  [ROLES.CUSTOMER]: 'customer'
}

export const CURRENT_ROLE = ROLE_ENV_NAMES[process.env.ROLE]
