import type { Router } from 'vue-router'
import AfterEachGuards from './afterEach'
import BeforeEachGuards from './beforeEach'

export default class RouterGuards {
  /**
   * Load router guard
   */
  public static load(router: Router) {
    AfterEachGuards.load(router)
    BeforeEachGuards.load(router)
  }
}
