<style lang="less">
</style>

<template>
  <div>
    <div class="header">
      <div class="user-info">
        <a href="#">
          <img src="#" alt="用户头像">
          <span class="userName">用户名</span>
        </a>
      </div>
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
