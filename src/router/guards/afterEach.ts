import type { Router } from 'vue-router'

export default class AfterEachGuard {
  /**
   * Load after each router guard
   * @param router router instance
   */
  public static load(router: Router) {
    router.afterEach(() => {})
  }
}
