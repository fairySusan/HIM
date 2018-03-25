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
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <player></player>
  </div>
</template>

<script>
import navBar from './components/navBar/navBar'
import player from "./components/player/player";
export default {
  name: 'App',
  components:{
    navBar,
    player
  }
}
</script>

<style>
</style>
