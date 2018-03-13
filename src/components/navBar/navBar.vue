/* 顶部导航栏 */
<style lang="less">

</style>
<template>
  <div class="navBar">
    <router-link to="/recommend">
        <span class="nav-btn">首页</span>
    </router-link>
    <router-link to="/singer"><span class="nav-btn">歌手</span></router-link>
    <router-link to="/rank"><span class="nav-btn">排行</span></router-link>
    <router-link to="/search"><span class="nav-btn">搜索</span></router-link>
  </div>
</template>
<script>
export default {
  data(){
    return{
        selected:1
    }
  },
  mounted(){
  },
  methods:{
  }
}
</script>


