<template>
  <v-app>
    <Nav/>
    <Menu/>
    <v-content class="">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Nav from '@/components/nav'
import Menu from '@/components/menu'
export default {
  components: {Nav, Menu},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
