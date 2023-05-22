import axios, { AxiosInstance } from 'axios'
import { joinURL } from 'ufo'

import { ENV_VARS } from '@/core/constants'

export class Service {
  /**
   * Get the endpoint for the service method
   * @param methodEndpoint endpoint for the called method
   * @returns full http url for the request
   *
   * @example
   * new _AuthService('api/v1/auth')
   *
   * this.e('signin') => '$ENV_HOST$/api/v1/auth/signin'
   */
  protected e(methodEndpoint: string) {
    return joinURL(this.apiHost, this.endpoint, methodEndpoint)
  }

  axios: AxiosInstance
  endpoint: string
  apiHost: string

  constructor(endpoint: string) {
    this.axios = axios
    this.endpoint = endpoint
    this.apiHost = ENV_VARS.API_HOST
  }
}
