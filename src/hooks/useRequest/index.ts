import Axios from 'axios'
import AxiosInterceptor from './interceptor'

export const useRequest = () => {
  const axiosInstance = Axios.create({
    baseURL: import.meta.env.VUE_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  axiosInstance.defaults.timeout = 100000
  AxiosInterceptor.addInterceptor(axiosInstance)

  return axiosInstance
}
