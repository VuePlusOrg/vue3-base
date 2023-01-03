import { computed, defineComponent, ref, h } from 'vue'
import { Menu, MenuItem, LayoutSider, SubMenu } from 'ant-design-vue'
import { DashboardOutlined } from '@ant-design/icons-vue'
import { useI18n } from 'vue-i18n'
import type { MenuConfig } from '@/types'
import './AppSider.less'

export default defineComponent({
  setup() {
    const { t } = useI18n({
      inheritLocale: true,
      useScope: 'global'
    })

    const collapsed = ref(false)
    const selectedKeys = ref(['1'])
    const menuConfig = ref<MenuConfig[]>([
      {
        routeName: 'aaa',
        title: 'Dashboard',
        icon: DashboardOutlined
      }
    ])

    const menuDOM = computed(() => {
      const DOMList: JSX.Element[] = []

      menuConfig.value.forEach(config => {
        if (!Array.isArray(config.children)) {
          DOMList.push(
            <MenuItem key={config.routeName}>
              {h(config.icon)}
              <span>{t(config.title)}</span>
            </MenuItem>
          )
        } else {
          DOMList.push(
            <SubMenu
              v-else
              key={config.routeName}
              title={() => (
                <span>
                  {h(config.icon)}
                  <span>{config.title}</span>
                </span>
              )}
            >
              {config.children.map(subConfig => (
                <MenuItem key={subConfig.routeName}>
                  {subConfig.routeName}
                </MenuItem>
              ))}
            </SubMenu>
          )
        }
      })

      return DOMList
    })

    return () => (
      <LayoutSider
        v-model:collapsed={collapsed.value}
        collapsible={collapsed.value}
        class="sider"
      >
        <div class="sider__logo">
          <img
            class="sider__logo__image"
            src="src/assets/logo.svg"
            alt="logo"
          />
          <div class="sider__logo__text">Vue3 Base</div>
        </div>
        <Menu
          v-model:selectedKeys={selectedKeys.value}
          theme="dark"
          mode="inline"
        >
          {menuDOM.value.map(item => item)}
        </Menu>
      </LayoutSider>
    )
  }
})
