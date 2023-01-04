<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import enUS from 'ant-design-vue/es/locale/en_US'

import { useRoute } from 'vue-router'
import { useAppStore } from './stores'
import AppLayout from '@/layouts/AppLayout/index.vue'
import BlankLayout from '@/layouts/BlankLayout/index.vue'

const { locale: i18NLocale } = useI18n({ useScope: 'global' })
const appStore = useAppStore()
const route = useRoute()

const antdLocales = { zhCN, enUS }

const antdLocale = computed(
  () => antdLocales[appStore.locale as keyof typeof antdLocales]
)

const removeGlobalLoading = () =>
  document.getElementById('global-loading')?.remove()

watch(
  () => appStore.locale,
  newLocale => {
    i18NLocale.value = newLocale
  }
)

onMounted(() => {
  removeGlobalLoading()
})
</script>

<template>
  <a-config-provider :locale="antdLocale">
    <AppLayout v-if="route.name !== 'Login'" />
    <BlankLayout v-else />
  </a-config-provider>
</template>
