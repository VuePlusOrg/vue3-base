<script setup lang="ts">
import { computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

import { useAppStore } from './stores'

const { locale: i18NLocale } = useI18n({ useScope: 'global' })
const appStore = useAppStore()

const antdLocales = { zhCN, enUS }

const antdLocale = computed(
  () => antdLocales[appStore.locale as keyof typeof antdLocales]
)

watch(
  () => appStore.locale,
  newLocale => {
    i18NLocale.value = newLocale
  }
)
</script>

<template>
  <a-config-provider :locale="antdLocale">
    <AppRouterView />
  </a-config-provider>
</template>
