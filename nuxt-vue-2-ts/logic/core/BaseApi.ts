import { joinURL } from 'ufo'

import { IHttpClient } from '~/logic/types/http-client'

import { RUNTIME_VARS } from '../constants/core'

export type BaseApiConstructorOptions = {
  namespace: string
  httpClient: IHttpClient
  customApiHost?: string
}

export type RequestConfig = {
  headers?: Object
  responseType?: string
}

export class BaseApi {
  namespace: string
  httpClient: IHttpClient
  customApiHost?: string

  constructor(options: BaseApiConstructorOptions) {
    this.namespace = options.namespace
    this.httpClient = options.httpClient
    this.customApiHost = options.customApiHost
  }

  get apiHost() {
    return this.customApiHost ?? RUNTIME_VARS.API_HOST
  }

  private _constructUrl(endpoint: string) {
    return joinURL(this.apiHost, this.namespace, endpoint)
  }

  async get<T>(endpoint: string, query: any = {}, config: RequestConfig = {}) {
    return await this.httpClient.get<T>({
      url: this._constructUrl(endpoint),
      query,
      headers: config.headers,
      responseType: config.responseType
    })
  }

  async post<T>(endpoint: string, data: any = {}, config: RequestConfig = {}) {
    return await this.httpClient.post<T>({
      url: this._constructUrl(endpoint),
      data,
      headers: config.headers,
      responseType: config.responseType
    })
  }

  async put<T>(endpoint: string, data: any = {}, config: RequestConfig = {}) {
    return await this.httpClient.put<T>({
      url: this._constructUrl(endpoint),
      data,
      headers: config.headers,
      responseType: config.responseType
    })
  }

  async patch<T>(endpoint: string, data: any = {}, config: RequestConfig = {}) {
    return await this.httpClient.patch<T>({
      url: this._constructUrl(endpoint),
      data,
      headers: config.headers,
      responseType: config.responseType
    })
  }

  async delete<T>(
    endpoint: string,
    data: any = {},
    config: RequestConfig = {}
  ) {
    return await this.httpClient.delete<T>({
      url: this._constructUrl(endpoint),
      data,
      headers: config.headers,
      responseType: config.responseType
    })
  }
}
