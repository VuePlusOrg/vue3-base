<template>
  <RouterView v-slot="{ Component }">
    <transition name="slide-left">
      <KeepAlive :include="routeNameStack">
        <component
          :is="Component"
          class="router-view"
        />
      </KeepAlive>
    </transition>
  </RouterView>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useAppStore } from '@/stores'

const routeNameStack = computed(() => useAppStore().routeNameStack)
</script>

<style lang="less" scoped>
.router-view {
  width: 100%;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  width: 100%;
  height: 100%;
  will-change: transform;
  transition: all 300ms cubic-bezier(0.55, 0, 0.1, 1);
  position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(3%, 0, 0);
}
.slide-left-enter-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-3%, 0, 0);
}
</style>
