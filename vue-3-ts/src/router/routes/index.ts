import { RouteRecordRaw } from 'vue-router'

import { ENV_VARS } from '@/core/constants'
import { authRoutes } from '@/router/routes/auth'

/*
  all routes are protected by default
  meta: { guest: true }  => guest only
  meta: { skipAuthGuard: true }  => guest & auth
*/

export const settingsRoutes = {
  profile: {
    path: '',
    component: () => import('@/pages/SettingsProfilePage.vue'),
    name: 'settings-profile',
    meta: { title: 'xx' }
  },
  preferences: {
    path: 'preferences',
    component: () => import('@/pages/SettingsPreferencesPage.vue'),
    name: 'settings-preferences',
    meta: { title: 'xx' }
  },
  feedback: {
    path: 'feedback',
    component: () => import('@/pages/SettingsFeedbackPage.vue'),
    name: 'settings-feedback',
    meta: { title: 'xx xx' }
  }
}

export const routes: Array<RouteRecordRaw> = [
  ...authRoutes,

  ...(!ENV_VARS.VITE_ENABLE_ONLY_EMAIL_VERIFICATION
    ? [
        {
          path: '/',
          component: () => import('@/pages/IndexPage.vue'),
          meta: { title: 'xx' }
        },
        {
          path: '/daylog',
          component: () => import('@/pages/DaylogPage.vue'),
          meta: { title: 'xx' }
        },
        {
          path: '/tasks',
          component: () => import('@/pages/TasksPage.vue'),
          meta: { title: 'xx' }
        },
        {
          path: '/stats',
          component: () => import('@/pages/StatsPage.vue'),
          meta: { title: 'xx' }
        },
        {
          path: '/settings',
          component: () => import('@/pages/SettingsPage.vue'),
          meta: { title: 'xx' },
          children: Object.values(settingsRoutes)
        }
      ]
    : [])
]
