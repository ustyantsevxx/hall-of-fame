import '@/plugins/global-styles'
import '@/plugins/global-scripts'

import { createPinia } from 'pinia'
import { createApp } from 'vue'
import VueFinalModal from 'vue-final-modal'
import { VueMasonryPlugin } from 'vue-masonry'

import App from '@/App.vue'
import { ENV_VARS } from '@/core/constants'
import { attachAxiosInterceptors } from '@/plugins/axios-interceptors'
import { extendGlobalDayjs } from '@/plugins/extend-global-dayjs'
import { tryGetLoggedInUser } from '@/plugins/logged-in-user'
import { registerUnleashClient } from '@/plugins/unleash-client'
import { registerGlobalDirectives } from '@/plugins/vue-directives'
import { router } from '@/router'

// eslint-disable-next-line no-restricted-imports
import { makeServer } from '../mock'

const run = async () => {
  if (!ENV_VARS.VITE_ENABLE_ONLY_EMAIL_VERIFICATION) {
    attachAxiosInterceptors()
  }

  if (ENV_VARS.MOCK_API) {
    // eslint-disable-next-line no-console
    console.log('%cMOCK API ENABLED', 'color: blue')

    makeServer()
  }

  extendGlobalDayjs()

  const app = createApp(App)
  const piniaStore = createPinia()

  registerUnleashClient(piniaStore)

  if (!ENV_VARS.VITE_ENABLE_ONLY_EMAIL_VERIFICATION) {
    await tryGetLoggedInUser(piniaStore)
  }

  app.use(VueFinalModal)
  app.use(router)
  app.use(piniaStore)
  app.use(VueMasonryPlugin)

  registerGlobalDirectives(app)

  app.mount('#__xx')
}

run()
