import { AppContainer } from '~/logic/core/app-container'
import { CURRENT_ROLE, ROLES } from '~/logic/core/runtime'

// first place to execute app init code
// here you have access to $auth

export default async context => {
  AppContainer.axios = context.app.$axios
  AppContainer.cookies = context.app.$cookies
  AppContainer.i18n = context.app.i18n

  if (context.app.$auth.loggedIn && CURRENT_ROLE === ROLES.ENGINEER) {
    await context.store.dispatch('fetchAuthenticatedUserData')
  }
}
