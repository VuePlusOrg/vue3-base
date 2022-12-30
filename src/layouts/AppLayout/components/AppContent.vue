<template>
  <a-layout-content style="margin: 16px">
    <div
      :style="{
        padding: '24px',
        background: 'white',
        minHeight: '360px'
      }"
    >
      <AppRouterView />
    </div>
  </a-layout-content>
</template>

<script setup lang="ts">
import AppRouterView from '@/components/AppRouterView.vue'
</script>
