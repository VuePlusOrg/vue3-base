<route lang="yaml">
name: SFCI18N
</route>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div>{{ t('This is a text for test I18N.') }}</div>
</template>

<i18n src="./i18n.json" />
