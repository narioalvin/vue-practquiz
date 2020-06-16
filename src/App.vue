<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  name: 'App',
};
</script>

<style lang="scss">
@import './styles/main.scss';
@font-face {
  font-family: 'PatrickHand';
  src: url('./assets/font/PatrickHand-Regular.ttf');
  src: local('PatrickHand Regular'), local('PatrickHand-Regular'),
    url('./assets/font/PatrickHand-Regular.ttf') format('opentype');
  // font-weight: normal;
  // font-style: normal;
}
</style>
