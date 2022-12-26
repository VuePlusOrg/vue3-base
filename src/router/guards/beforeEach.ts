import type { RouteLocationNormalized, Router } from 'vue-router'
import { useAppStore } from '@/stores/app'

export default class BeforeEachGuard {
  /**
   * Load before each router guard
   * @param router router instance
   */
  public static load(router: Router) {
    router.beforeEach(to => {
      BeforeEachGuard.recordRouteNameStack(to)
    })
  }

  /**
   * Record the routing stack name for use by `AppRouterView`
   * @param to route to
   */
  public static recordRouteNameStack(to: RouteLocationNormalized) {
    if (to.name !== undefined) {
      const { routeNameStack } = useAppStore()
      const IS_ROUTE_STACK_EMPTY = routeNameStack.length === 0

      if (IS_ROUTE_STACK_EMPTY) {
        routeNameStack.push(to.name as string)
      } else {
        const NEW_PAGE_IN_ROUTE_STACK_POSITION = routeNameStack.indexOf(
          to.name as string
        )
        const IS_NEW_ROUTE = NEW_PAGE_IN_ROUTE_STACK_POSITION === -1

        if (IS_NEW_ROUTE) {
          routeNameStack.push(to.name as string)
        } else {
          routeNameStack.splice(
            NEW_PAGE_IN_ROUTE_STACK_POSITION + 1,
            routeNameStack.length - NEW_PAGE_IN_ROUTE_STACK_POSITION + 1
          )
        }
      }
    }
  }
}
