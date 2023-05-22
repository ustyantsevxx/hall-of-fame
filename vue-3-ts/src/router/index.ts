import { createRouter, createWebHistory } from 'vue-router'

import { ENV_VARS } from '@/core/constants'
import { routes } from '@/router/routes'
import { useUserStore } from '@/stores/user'

export const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _from, next) => {
  if (!ENV_VARS.VITE_ENABLE_ONLY_EMAIL_VERIFICATION) {
    if (!to.matched.some(r => r.meta.skipAuthGuard === true)) {
      const { loggedIn } = useUserStore()

      const guestOnly = to.matched.some(r => r.meta.guest === true)

      if (guestOnly && loggedIn) {
        next('/')
      } else if (!guestOnly && !loggedIn) {
        next(`/auth/login?next=${to.fullPath}`)
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }

  document.title = to.meta.title ? `${to.meta.title} — xxx` : 'xxx'
})
