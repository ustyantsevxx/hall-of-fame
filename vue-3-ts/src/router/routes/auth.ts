import { RouteRecordRaw } from 'vue-router'

import { ENV_VARS } from '@/core/constants'

export const authRoutes: Array<RouteRecordRaw> = [
  ...(!ENV_VARS.VITE_ENABLE_ONLY_EMAIL_VERIFICATION
    ? [
        {
          path: '/auth/login',
          component: () => import('@/pages/AuthLoginPage.vue'),
          meta: { guest: true, title: 'xx' }
        },

        {
          path: '/auth/register',
          component: () => import('@/pages/AuthRegisterPage.vue'),
          meta: { guest: true, title: 'xx' }
        },

        {
          path: '/auth/password/restore',
          component: () => import('@/pages/AuthPasswordRestorePage.vue'),
          meta: { guest: true, title: 'xx xx?' }
        },

        {
          path: '/auth/password/new',
          component: () => import('@/pages/AuthPasswordNewPage.vue'),
          meta: { guest: true, title: 'xx xx' }
        }
      ]
    : []),

  {
    path: '/auth/email/verify',
    component: () => import('@/pages/AuthEmailVerifyPage.vue'),
    meta: { skipAuthGuard: true, title: 'xx email' }
  }
]
