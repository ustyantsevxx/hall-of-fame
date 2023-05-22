import 'vue-js-modal/dist/styles.css'

import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

Vue.use(VModal)

export default function (_, inject) {
  inject('modal', VModal)
}
