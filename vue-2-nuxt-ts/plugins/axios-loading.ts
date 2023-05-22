import { Context } from '@nuxt/types'

export default (context: Context) => {
  const axios = context.app.$axios

  axios.onRequest(() => {
    window?.$nuxt?.$loading?.start?.()
  })

  axios.onResponse(() => {
    window?.$nuxt?.$loading?.finish?.()
  })

  axios.onError(() => {
    window?.$nuxt?.$loading?.finish?.()
  })
}
