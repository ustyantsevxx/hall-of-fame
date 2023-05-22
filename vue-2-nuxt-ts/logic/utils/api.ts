import { IApiResponse } from '~/logic/types/http-client'

export const handleServerResponse = <T>(
  response: IApiResponse<T>,
  options?: {
    successCode?: number
  }
) => {
  return response.status === (options?.successCode || 200)
    ? { success: true, data: response.data as T }
    : {
        success: false,
        error: {
          message: response.data[0].description as string,
          status: response.status
        }
      }
}
