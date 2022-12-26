import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const locale = ref('enUS')
  const routeNameStack = ref<string[]>([])

  const changeLocale = (newLocale: string) => {
    locale.value = newLocale
  }

  return {
    locale,
    routeNameStack,
    changeLocale
  }
})
