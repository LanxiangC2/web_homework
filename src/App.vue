<template>
  <v-app>
    <Nav/>
    <Menu/>
    <v-content class="content">
      <!-- layer遮罩层 -->
      <div class="layer">
      </div>
      <!-- layer遮罩层2 -->
      <!-- <div class="layer2">
      </div> -->
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
@import url("./common/font/font.css");
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.content{
  background: url('./assets/cqu.jpg');
  background-size: cover;
  height: 90%;
  position: relative;
}
.layer{
  height: 100%;
  width: 100%;
  background: grey;
  opacity: 0.7;
  z-index: 0;
  position: absolute;
  top: 0px;
}
/* .layer2{
  height: 30%;
  width: 100%;
  background: #B388FF;
  opacity: 0.7;
  position: absolute;
  top: 0px;
} */
</style>
