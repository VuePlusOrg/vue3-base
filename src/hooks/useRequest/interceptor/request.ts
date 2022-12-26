import type { AxiosInstance, AxiosRequestConfig } from 'axios'
import { useUserStore } from '@/stores'

export default class RequestInterceptor {
  public static load(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        const { token } = useUserStore()

        if (token) {
          config.headers?.options?.set('Authorization', `Bearer ${token}`)
        }

        return config
      }
    )
  }
}
