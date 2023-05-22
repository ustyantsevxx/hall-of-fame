import { RequestConfig } from '~/logic/core/BaseApi'

export interface IApiResponse<T> {
  data: T
  status: number
  headers: Object
}

export interface IHttpClientGetParameters extends RequestConfig {
  url: string
  query?: Object
}

export interface IHttpClientPostParameters extends RequestConfig {
  url: string
  data?: Object
}

export interface IHttpClientPutParameters extends RequestConfig {
  url: string
  data?: Object
}

export interface IHttpClientPatchParameters extends RequestConfig {
  url: string
  data?: Object
}

export interface IHttpClient {
  get<T>(config: IHttpClientGetParameters): Promise<IApiResponse<T>>
  post<T>(config: IHttpClientPostParameters): Promise<IApiResponse<T>>
  put<T>(config: IHttpClientPutParameters): Promise<IApiResponse<T>>
  patch<T>(config: IHttpClientPatchParameters): Promise<IApiResponse<T>>
  delete<T>(config: IHttpClientPatchParameters): Promise<IApiResponse<T>>
}
