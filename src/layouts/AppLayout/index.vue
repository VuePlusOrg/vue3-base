<template>
  <a-layout style="min-height: 100vh">
    <AppSider />
    <a-layout>
      <AppHeader />
      <AppContent />
      <AppFooter />
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import AppSider from './components/AppSider'
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'
import AppContent from './components/AppContent.vue'
</script>
<style>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
</style>
