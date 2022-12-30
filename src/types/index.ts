export interface MenuConfig {
  icon?: any

  /**
   * The title for show.
   */
  title: string

  /**
   * The name of route for navigate.
   */
  routeName: string

  /**
   * Config for submenu.
   */
  children?: MenuConfig[]
}
