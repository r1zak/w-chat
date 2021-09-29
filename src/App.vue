<template>
  <router-view v-slot="{ Component }">
    <transition name="route" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<style lang="scss">
body {
  overflow: hidden;
}

.route-enter-from {
  opacity: 0;
}

.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}

.route-leave-to {
  opacity: 0;
}
</style>
