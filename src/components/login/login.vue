<style lang="less">
@import '../../assets/less/var.less';
#login{
  background: @purePurple;
  header{
    background:@themeColor;
    text-align: center;
    font-size: 0.5rem;
    color:#fff;
    height:1.5rem;
    line-height: 1.5rem;
    position: relative;
    .return-icon{
      position: absolute;
      left:10px;
      top:50%;
      transform:translate(0,-50%);
      -webkit-transform: translate(0,-50%);
    }
  }
  .poto{
    width: 4rem;
    height:4rem;
    margin:10px auto;
    img{
      border-radius: 50%;
    }
  }
  .user-name{
    text-align: center;
    font-size:0.6rem;
    color:@themeColor;
  }
  .check-out{
    text-align: center;
    margin:30px 0;
    button{
      width:6rem;
      height:1.5rem;
      font-size: 0.6rem;
      background:@themeColor;
      color:rgb(248,248,248);
      border-radius: 3px;
    }
  }
}
</style>

<template>
  <div id="login" class="cover">
    <header>
      <router-link to="/recommend"> <i class="return-icon sprite-icon"></i></router-link>
      账号
    </header>
    <div>
      <div class="poto">
        <img src="../../assets/userPoto.jpg" alt="" width="100%" height="100%">
      </div>
      <div class="user-name">fairySusan</div>
      <div class="check-out"><button>退出登录</button></div>
    </div>
  </div>
</template>


<script>
export default {
  
}
</script>

