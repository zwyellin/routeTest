<template>
  <div id="app">
    <img src="./assets/logo.png">
    <keep-alive>
       <router-view v-if="$route.meta.keepAlive" :includes="['/','/b']" />
    </keep-alive>
     <router-view v-if="! $route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
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
  margin-top: 60px;
}
</style>
