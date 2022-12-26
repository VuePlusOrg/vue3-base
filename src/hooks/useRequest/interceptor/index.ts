import type { AxiosInstance } from 'axios'
import RequestInterceptor from './request'
import ResponseInterceptor from './response'

export default class AxiosInterceptor {
  public static addInterceptor(axiosInstance: AxiosInstance) {
    RequestInterceptor.load(axiosInstance)
    ResponseInterceptor.load(axiosInstance)
  }
}
