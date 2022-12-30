import type { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { useUserStore } from '@/stores'

export default class ResponseInterceptor {
  /**
   * Add response interceptor
   * @param axiosInstance Axios instance
   */
  public static load(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(
      ResponseInterceptor.onSuccess,
      ResponseInterceptor.onFail
    )
  }

  /**
   * Add response success interceptor
   * @param response Axios response object
   * @returns Promise
   */
  private static onSuccess(response: AxiosResponse) {
    const IS_REAL_SUCCESS = response.status === 200

    if (IS_REAL_SUCCESS) {
      return Promise.resolve(response)
    }
    return Promise.reject(
      new Error(ResponseInterceptor.errorCodeToText(response))
    )
  }

  /**
   * Add response fail interceptor
   * @param error Axios error object
   * @returns Promise
   */
  private static onFail(error: AxiosError) {
    const userStore = useUserStore()
    const httpStatusCode = error?.response?.status as number

    /**
     * the error message returned by the backend
     */
    const serviceErrorMessage: string | undefined = (
      error?.response?.data as any
    )?.message

    /**
     * Axios internal error information, this field is mainly used for request timeout judgment
     */
    const axiosErrorMessage = error.message

    let errorMessage: string = serviceErrorMessage || 'Internal Server Error'

    const IS_TIMEOUT = axiosErrorMessage.indexOf('timeout') !== -1
    const IS_UNAUTHORIZED = httpStatusCode === 401 || httpStatusCode === 403

    if (IS_TIMEOUT) {
      errorMessage = 'Request timed out, please try again later'
    }

    if (IS_UNAUTHORIZED) {
      if (serviceErrorMessage === undefined) {
        errorMessage =
          'Unexpected login failure, please contact your system administrator'
      }
      userStore.logout()
    }

    return Promise.reject(new Error(errorMessage))
  }

  /**
   * HTTP error code to error message text
   * @param response Axios response object
   * @returns error text
   */
  private static errorCodeToText(response: AxiosResponse) {
    /** http status code */
    const code = response.status
    /** notice text */
    let message = 'Request Error'
    switch (code) {
      case 400:
        message = 'Request Error'
        break
      case 401:
        message = 'Unauthorized'
        break
      case 403:
        message = 'Access Denied'
        break
      case 404:
        message = 'Resource Does Not Exist'
        break
      case 408:
        message = 'Request Time Out'
        break
      case 500:
        message = 'Internal Server Error'
        break
      case 501:
        message = 'Bearer Service Not Implemented'
        break
      case 502:
        message = 'Gateway Error'
        break
      case 503:
        message = 'Service Available'
        break
      case 504:
        message = 'Gateway Timeout'
        break
      case 505:
        message = 'Unsupported HTTP Version'
        break
      default:
        message = 'Internal Server Error'
    }
    return message
  }
}
