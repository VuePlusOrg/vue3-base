import type { App } from 'vue'
import type { Router } from 'vue-router'
import { createPinia, type Pinia } from 'pinia'
import router from '@/router'

export default class VuePlugin {
  private app!: App<Element>

  private router!: Router

  private store!: Pinia

  constructor(app: App<Element>) {
    this.app = app
    this.router = router
    this.store = createPinia()
  }

  public load() {
    this.app.use(this.store)
    this.app.use(this.router)
  }

  public mount() {
    this.app.mount('#app')
  }
}
