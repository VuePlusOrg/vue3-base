import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const router = useRouter()

  const token = ref('')

  const userInfo = reactive({
    userName: '',
    userId: '',
    gender: -1
  })

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
    logout
  }
})
