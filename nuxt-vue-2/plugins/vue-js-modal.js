import Vue from 'vue'
import VModal from 'vue-js-modal'

Vue.use(VModal)

export default function (_, inject) {
  inject('modal', VModal)
}
