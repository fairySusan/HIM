// 用户中心页面
<style lang="less">
@import '../../assets/less/var.less';
    #user-center{
        header{
            position: relative;
            height: 2.5rem;
            line-height: 2.5rem;
            background:pink;
            text-align: center;
            .return-btn{
                position: absolute;
                left: 10px;
            }
            .toggle-btn{
                font-size:0;
                display: inline-block;
                button{
                    font-size:14px;
                    padding:3px 12px;
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
          <i class="return-btn" @click="clickBack">&lt</i>
          <div class="toggle-btn">
              <button>我 喜 欢 的</button>
              <button>最 近 听 的</button>
          </div>
      </header>
      <!-- 我喜欢的音乐 -->
      <div>
          <ul class="list-wrap">
              <li v-for="item in favoriteList" :key="item.songid">
                  <h6 class="songname">{{item.songname}}</h6>
                  <span class="singer grayFont">{{item.singer}}-{{item.albumname}}</span>
              </li>
          </ul>
      </div>
      <!-- 我最近听的音乐 -->
      <div>
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

      }
  },
  methods:{
    clickBack(){
        this.$router.push('/recommend');
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


