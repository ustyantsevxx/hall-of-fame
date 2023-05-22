import { ResponseType } from 'axios'

import {
  IApiResponse,
  IHttpClient,
  IHttpClientGetParameters,
  IHttpClientPatchParameters,
  IHttpClientPostParameters,
  IHttpClientPutParameters
} from '~/logic/types/http-client'
import { Container } from '~/plugins/nuxt-plugins-container'

export class NuxtAxiosClient implements IHttpClient {
  private static _getResponseBody(response: any) {
    return {
      data: response?.data,
      status: response?.status ?? 503,
      headers: response?.headers
    }
  }

  async get<T>(config: IHttpClientGetParameters): Promise<IApiResponse<T>> {
    try {
      const response = await Container.axios.get(config.url, {
        params: config.query,
        responseType: (config.responseType || 'json') as ResponseType
      })
      return NuxtAxiosClient._getResponseBody(response)
    } catch (error) {
      return NuxtAxiosClient._getResponseBody(error.response)
    }
  }

  async post<T>(config: IHttpClientPostParameters): Promise<IApiResponse<T>> {
    try {
      const response = await Container.axios.post(config.url, config.data, {
        headers: config.headers,
        responseType: (config.responseType || 'json') as ResponseType
      })
      return NuxtAxiosClient._getResponseBody(response)
    } catch (error) {
      return NuxtAxiosClient._getResponseBody(error.response)
    }
  }

  async put<T>(config: IHttpClientPutParameters): Promise<IApiResponse<T>> {
    try {
      const response = await Container.axios.put(config.url, config.data, {
        headers: config.headers,
        responseType: (config.responseType || 'json') as ResponseType
      })
      return NuxtAxiosClient._getResponseBody(response)
    } catch (error) {
      return NuxtAxiosClient._getResponseBody(error.response)
    }
  }

  async patch<T>(config: IHttpClientPatchParameters): Promise<IApiResponse<T>> {
    try {
      const response = await Container.axios.patch(config.url, config.data, {
        headers: config.headers,
        responseType: (config.responseType || 'json') as ResponseType
      })
      return NuxtAxiosClient._getResponseBody(response)
    } catch (error) {
      return NuxtAxiosClient._getResponseBody(error.response)
    }
  }

  async delete<T>(config: IHttpClientPostParameters): Promise<IApiResponse<T>> {
    try {
      const response = await Container.axios.delete(config.url, {
        data: config.data,
        headers: config.headers,
        responseType: (config.responseType || 'json') as ResponseType
      })
      return NuxtAxiosClient._getResponseBody(response)
    } catch (error) {
      return NuxtAxiosClient._getResponseBody(error.response)
    }
  }
}
