<template>
  <header class="content">
    <router-link to="/locations">/locations</router-link>
    <router-link to="/tracked">/tracked</router-link>
    <router-link to="/tracking">/tracking</router-link>
  </header>
</template>
<script>
export default {
  name: 'Header'
};
</script>
<style lang="scss">
.content {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
}
</style>
