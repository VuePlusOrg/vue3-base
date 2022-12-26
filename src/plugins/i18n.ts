import type { App } from 'vue'
import { createI18n, type I18n } from 'vue-i18n'
import { useAppStore } from '@/stores'
import { zhCN, enUS } from '@/i18n'

export default class I18NPlugin {
  private app!: App<Element>

  public i18n!: I18n

  constructor(app: App<Element>) {
    this.app = app
  }

  public load() {
    const appStore = useAppStore()
    this.i18n = createI18n({
      legacy: false,
      locale: appStore.locale,
      fallbackLocale: appStore.locale,
      messages: {
        zhCN,
        enUS
      }
    })
    this.app.use(this.i18n)
  }
}
