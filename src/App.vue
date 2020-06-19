<template>
  <div id="app">
    <!-- <svg>
      <use xlink:href="#icon-medal"/>
    </svg> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div id="nav" v-if="$store.state.user.token">
      <router-link to="/"><SvgIcon iconClass="medal"/>首页</router-link> | 
      <router-link to="/about">关于</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
// import HelloWorld from 'comps/HelloWorld.vue'
// import '@/icons/svg/medal.svg'
import SvgIcon from 'comps/SvgIcon.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
    SvgIcon
  }
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
