import { joinURL } from 'ufo'

const apiHost = joinURL(process.env.API_HOST, 'api/v1')

export const STRATEGIES = {
  LOCAL: 'local'
}

export const NuxtAuthConfig = {
  redirect: false,

  strategies: {
    [STRATEGIES.LOCAL]: {
      scheme: '~/plugins/nuxt/auth/custom-scheme',

      token: {
        property: 'token.access_token'
      },

      refreshToken: {
        property: 'token.refresh_token'
      },

      user: {
        property: false
      },

      endpoints: {
        login: {
          url: `${apiHost}/auth/login`,
          method: 'post'
        },

        user: {
          url: `${apiHost}/users/me`,
          method: 'get'
        },

        refresh: {
          url: `${apiHost}/auth/refresh`,
          method: 'post'
        },

        logout: {
          url: `${apiHost}/auth/logout`,
          method: 'delete'
        }
      }
    }
  },

  plugins: ['~/plugins/nuxt-init']
}
