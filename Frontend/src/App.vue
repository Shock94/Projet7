<template>
  <v-app id="app">
    <Header :isAuthenticated="isAuthenticated"></Header>
    <router-view></router-view>
  </v-app>
</template>

<script>

import Header from './components/Header.vue'
import { hasUserToken$ } from './user-token';

export default {
  name: 'App',
  components: {
    Header,
  },
  data() {
    return {
      hasUserTokenSubscription: null,
      isAuthenticated: hasUserToken$.getValue(),
    };
  },
  beforeMount() {
    this.hasUserTokenSubscription = hasUserToken$.subscribe(hasUserToken => {
      console.log('hasUserTokenSubscription', hasUserToken);
      this.isAuthenticated = hasUserToken;
    });
  },
  beforeUnmount() {
    if (this.hasUserTokenSubscription) {
      this.hasUserTokenSubscription.unsubscribe();
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>