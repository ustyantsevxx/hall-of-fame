import { ModuleOptions } from '@nuxtjs/auth-next'
import { RecursivePartial, Strategy } from '@nuxtjs/auth-next/dist'

import { RUNTIME_VARS } from '../logic/constants/core'

const apiHost = `${RUNTIME_VARS.API_HOST}/api/v1`

const STRATEGIES = {
  LOCAL: 'local',
  LEGAL: 'legal',
  LEGAL_BY_TOKEN: 'legal_by_token'
}

const getBaseStrategyEndpoints = () => ({
  login: {
    url: `${apiHost}/auth/get_tokens`,
    method: 'post'
  },
  refresh: {
    url: `${apiHost}/auth/token/refresh`,
    method: 'post'
  },
  user: {
    url: `${apiHost}/users/me`,
    method: 'get'
  },
  logout: {
    url: `${apiHost}/auth/signout`,
    method: 'delete'
  }
})
const getBaseStrategy = (): RecursivePartial<Strategy> => ({
  scheme: 'refresh',
  token: {
    property: 'access_token'
  },
  refreshToken: {
    property: 'refresh_token'
  },
  user: {
    property: false
  },
  endpoints: {
    ...getBaseStrategyEndpoints()
  }
})

const NuxtAuthConfig: RecursivePartial<ModuleOptions> = {
  redirect: {
    // TODO: change to /login when INDIVIDUAL user version is done
    logout: '/login/legal',

    // TODO: delete when INDIVIDUAL user version is done
    login: '/login/legal'
  },

  strategies: {
    [STRATEGIES.LOCAL]: { ...getBaseStrategy() },
    [STRATEGIES.LEGAL]: {
      ...getBaseStrategy(),
      endpoints: {
        ...getBaseStrategyEndpoints(),
        login: {
          url: `${apiHost}/auth/signin_inn`,
          method: 'post'
        }
      }
    },
    [STRATEGIES.LEGAL_BY_TOKEN]: {
      ...getBaseStrategy(),
      endpoints: {
        ...getBaseStrategyEndpoints(),
        login: {
          url: `${apiHost}/auth/signin_temp_token`,
          method: 'post'
        }
      }
    }
  },

  plugins: ['~/plugins/nuxt-init', '~/plugins/feature-flags']
}

export { NuxtAuthConfig, STRATEGIES }
