import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import { useRequest } from '@/hooks'

export const useUserStore = defineStore('user', () => {
  const request = useRequest()
  const router = useRouter()

  const token = ref('')

  const userInfo = reactive({
    userName: '',
    userId: '',
    gender: -1
  })

  const login = async (userName: string, password: string) => {
    const response = await request.get('/auth/login', {
      params: { userName, password }
    })

    const userDetailInfo = response.data.data

    userInfo.userName = userDetailInfo.userName
    userInfo.userId = userDetailInfo.userId
    userInfo.userName = userDetailInfo.userName

    message.success('Login Sucess!')

    router.replace({ name: 'Home' })
  }

  const logout = () => {
    token.value = ''
    userInfo.userName = ''
    userInfo.userId = ''
    userInfo.gender = -1

    router.replace({ name: 'Login' })
  }

  return {
    token,
    userInfo,
    login,
    logout
  }
})
