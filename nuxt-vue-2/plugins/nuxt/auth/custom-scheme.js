import {
  RefreshController,
  RefreshScheme
} from '@nuxtjs/auth-next/dist/runtime'

function getProperty(holder, propertyName) {
  if (!propertyName || !holder || typeof holder !== 'object') {
    return holder
  }
  if (propertyName in holder) {
    return holder[propertyName]
  }
  const propertyParts = Array.isArray(propertyName)
    ? propertyName
    : (propertyName + '').split('.')
  let result = holder
  while (propertyParts.length > 0 && result) {
    result = result[propertyParts.shift()]
  }
  return result
}

export default class CustomNuxtAuthScheme extends RefreshScheme {
  constructor(auth, options) {
    super(auth, options)

    this.refreshController = new RefreshController(this)
  }

  updateTokens(
    response,
    { isRefreshing = false, updateOnRefresh = true } = {}
  ) {
    const token = this.options.token.required
      ? getProperty(
          response.data,
          isRefreshing ? 'access_token' : this.options.token.property
        )
      : true

    const refreshToken = this.options.refreshToken.required
      ? getProperty(
          response.data,
          isRefreshing ? 'refresh_token' : this.options.refreshToken.property
        )
      : true

    this.token.set(token)

    if (refreshToken && (!isRefreshing || (isRefreshing && updateOnRefresh))) {
      this.refreshToken.set(refreshToken)
    }
  }
}
