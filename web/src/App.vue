<template>
  <div id="app">
    <the-header />
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
import TheHeader from '@/components/atoms/Header'

export default {
  name : 'MainApp',
  components: {
    TheHeader
  }
};
</script>
<style lang="scss">
@import 'sass/app.scss';
</style>
