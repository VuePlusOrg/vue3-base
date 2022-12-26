import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'

/**
 * Log out
 */
export const useLogOut = () => {
  const { clearToken } = useUserStore()
  const router = useRouter()

  clearToken()
  router.replace('/')
}
