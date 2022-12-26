import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const token = ref('')

  const userInfo = reactive({
    userName: '',
    userId: '',
    gender: 0
  })

  const clearToken = () => {
    token.value = ''
  }

  return {
    token,
    userInfo,
    clearToken
  }
})
