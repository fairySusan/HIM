<style lang="less">

</style>

<template>
  <div id="app">
    <div class="user-info">

    </div>
    <nav-bar></nav-bar>
    <div class="content">
      <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
import navBar from './components/navBar/navBar'
export default {
  name: 'App',
  components:{
    navBar
  }
}
</script>

<style>
</style>
