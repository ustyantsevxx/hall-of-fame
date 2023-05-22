import { joinURL } from 'ufo'

import { AppContainer } from '~/logic/core/app-container'

export class BaseService {
  constructor(endpoint) {
    this._axios = AppContainer.axios
    this._endpoint = joinURL(process.env.API_HOST, endpoint)
  }

  /** @type {import('axios').AxiosInstance} axios */
  get axios() {
    if (!this._axios) {
      this._axios = AppContainer.axios
    }

    return this._axios
  }

  /**
   * Always use this method to get endpoint path
   * @param  {...any} input Parts of the url (can be empty)
   * @returns {string} Complete request url
   * @example
   * process.env.API_HOST = 'https://api.com'
   *
   * class Service extends BaseService {}
   *
   * const service = new Service('api/v1/customers')
   *
   * service.getPath() => 'https://api.com/api/v1/customers'
   * service.getPath('all') => 'https://api.com/api/v1/customers/all'
   * service.getPath(1, 'get') => 'https://api.com/api/v1/customers/1/get'
   */
  getPath(...input) {
    return joinURL(this._endpoint, ...input.map(x => x.toString()))
  }
}
