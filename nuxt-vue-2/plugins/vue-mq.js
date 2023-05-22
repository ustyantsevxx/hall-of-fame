import Vue from 'vue'
import VueMq from 'vue-mq'

import { twTheme } from '~/logic/constants/theme'

Vue.use(VueMq, {
  breakpoints: Object.fromEntries(
    Object.entries(twTheme.screens).map(([screenName, breakPointString]) => [
      screenName,
      +breakPointString.split('px')[0]
    ])
  )
})
