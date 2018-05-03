/* 顶部导航栏 */
<style lang="less">

</style>
<template>
  <ul class="navBar">
    <li>
      首页
    </li>
    <li>
      <router-link to="/singer">歌手</router-link>
    </li>
    <li>
      <router-link to="/rank">排行</router-link>
    </li>
    <li>
      <router-link to="/search">搜索</router-link>
    </li>
  </ul>
</template>
<script>
export default {
  data(){
    return{
        selected:1
    }
  },
  mounted(){
    this.$router.push('/recommend');
  },
  methods:{
  }
}
</script>


