<template>
  <a-layout-header style="background: #fff; padding: 0; max-height: 48px">
    <div class="header-content">
      <a-dropdown>
        <div class="header-content__user">
          <img
            src="https://avatars.githubusercontent.com/u/44454223?v=4"
            class="header-content__user__avatar"
            alt="avatar"
          />
          <div class="header-content__user__name">
            {{ userStore.userInfo.userName }}
          </div>
        </div>

        <template #overlay>
          <a-menu>
            <a-menu-item @click="() => userStore.logout()">
              退出登录
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>

      <global-outlined
        class="header-content__i18n"
        @click="changeLocale"
      />
    </div>
  </a-layout-header>
</template>

<script setup lang="ts">
import { GlobalOutlined } from '@ant-design/icons-vue'
import { useAppStore, useUserStore } from '@/stores'

const appStore = useAppStore()
const userStore = useUserStore()

const changeLocale = () => {
  const NEW_LOCALE = appStore.locale === 'zhCN' ? 'enUS' : 'zhCN'
  appStore.changeLocale(NEW_LOCALE)
}
</script>

<style lang="less" scoped>
.header-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 20px;
  cursor: pointer;

  &__user {
    display: flex;
    align-items: center;
    height: 100%;
    &__avatar {
      height: 50%;
      border-radius: 50%;
    }
    &__name {
      margin-left: 10px;
    }
  }

  &__i18n {
    margin-left: 20px;
    cursor: pointer;
  }
}

:deep(.ant-dropdown-menu-title-content) {
  text-align: center;
}
</style>
