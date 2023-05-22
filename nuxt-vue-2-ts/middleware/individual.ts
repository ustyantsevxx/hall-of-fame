import { Context } from '@nuxt/types'

import { USER_ROLES } from '~/logic/modules/users'

export default function (context: Context) {
  const userRole = context.$accessor.auth.user?.role?.id

  if (userRole !== USER_ROLES.INDIVIDUAL) {
    return context.redirect('/transactions')
  }
}
