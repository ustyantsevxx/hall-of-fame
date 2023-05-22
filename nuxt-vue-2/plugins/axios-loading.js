const stopLoading = () => {
  window?.$nuxt?.$loading?.finish?.()
}

export default context => {
  const axios = context.app.$axios

  axios.onRequest(() => {
    window?.$nuxt?.$loading?.start?.()
  })

  axios.onResponse(stopLoading)
  axios.onResponseError(stopLoading)
}
