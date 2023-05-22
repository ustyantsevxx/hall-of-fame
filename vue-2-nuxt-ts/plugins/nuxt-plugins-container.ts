import { Context } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'

export class Container {
  static axios: NuxtAxiosInstance
}

export default (context: Context) => {
  Container.axios = context.app.$axios
}
