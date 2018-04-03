// 用户中心页面
<style lang="less">
@import '../../assets/less/var.less';
    #user-center {
        header{
            position: relative;
            height: 2rem;
            line-height: 2rem;
            background:@themeColor;
            text-align: center;
            .return-btn{
                position: absolute;
                left: 10px;
                right:0;
                top:0;
                bottom:0;
                margin:auto 0;
            }
            .toggle-btn{
                font-size:0;
                display: inline-block;
                button{
                    font-size:14px;
                    padding:3px 12px;
                    background:transparent;
                    border:1px solid rgba(120, 120, 120, 0.2);
                    color:rgba(0,0,0,.5);
                    border-radius: 3px;
                    &.active{
                        color:#fff;
                        background:linear-gradient(@themeColor,rgb(156,140,207));
                        background:-webkit-linear-gradient(@themeColor,rgb(156,140,207));
                    }
                }
            }
        }
        .list-wrap{
            li{
                height:45px;
                border-bottom: 1px solid @underlineColor;
                padding:3px 0 3px 10px;
                .singer{
                    font-size:12px;
                }
            }
        }
    }
</style>
<template>
  <div id="user-center">
      <header>
          <i class="return-btn return-icon" @click="clickBack"></i>
          <div class="toggle-btn">
              <button :class="{'active':isShowPanel}" @click="showPanel(true)">我 喜 欢 的</button>
              <button :class="{'active':!isShowPanel}" @click="showPanel(false)">最 近 听 的</button>
          </div>
      </header>
      <!-- 我喜欢的音乐 -->
      <div v-show="isShowPanel">
          <ul class="list-wrap">
              <li v-for="item in favoriteList" :key="item.songid">
                  <h6 class="songname">{{item.songname}}</h6>
                  <span class="singer grayFont">{{item.singer}}-{{item.albumname}}</span>
              </li>
          </ul>
      </div>
      <!-- 我最近听的音乐 -->
      <div v-show="!isShowPanel">
          <ul class="list-wrap">
              <li v-for="item in playHisList" :key="item.songid">
                  <h6 class="songname">{{item.songname}}</h6>
                  <span class="singer grayFont">{{item.singer}}-{{item.albumname}}</span>
              </li>
          </ul>
      </div>
  </div>
</template>
<script>
import { mapMutations ,mapActions,mapState,mapGetters} from "vuex";
export default {
  data(){
      return{
          isShowPanel:true
      }
  },
  methods:{
    clickBack(){
        this.$router.push('/recommend');
    },
    showPanel(flag){
        this.isShowPanel = flag;
    }
  },
  computed:{
    ...mapGetters([
        'favoriteList',
        'playHisList'
    ])
  }
}
</script>


