import { createRouter, createWebHistory } from 'vue-router'
import routes from 'virtual:generated-pages'
import RouterGuard from './guards'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

RouterGuard.load(router)

export default router
