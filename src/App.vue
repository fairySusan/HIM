<style lang="less">
 .app{
  .userPoto{
    width: 30px;
    height: 30px;
    border-radius:50%;
  }
  .userName{
    color:white;
  }
 }
</style>

<template>
  <div class="app">
    <div class="header">
      <div class="user-info">
        <a href="#">
            <img class="userPoto" src="./assets/userPoto.jpg" alt="用户头像" width="100%" height="100%">
          <span class="userName">fairySusan</span>
        </a>
      </div>
    </div>
    <nav-bar></nav-bar>
    <div class="content clearfix">
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
