/* 用户的播放列表 */
<style lang="less">
@import '../../assets/less/var.less';
    #playHistoryList{
        position: fixed;
        bottom: 0;
        z-index:1003;
        width:100%;
        .list-wrap{
            max-height:10rem;
            background: @themeColor;
            .deleteAll-btn{
                text-align: right;
                color:rgba(0,0,0,0.5);
            }
            li:not(.close-btn){
                position: relative;
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                border-bottom: 1px solid @underlineColor;
                .song-name,.singer-name{
                    font-size:12px;
                }
                .garbage-icon{
                   position: absolute;
                   top:0;
                   left:0;
                   right:0;
                   bottom:0;
                   margin:auto;
                   margin-right:10px;
                }
            }
            .close-btn{
                height: 40px;
                line-height: 40px;
                text-align: center;
                color:#fff;
            }
        }
    }
</style>
<template>
  <div id="playHistoryList">
      <ul class="list-wrap">
          <li class="deleteAll-btn" @click.stop="deleteAll">全部删除</li>
          <li v-for="item in playHisList" :key="item.songid">
              <span class="song-name">{{item.songname}}</span><span class="singer-name grayFont">-{{item.singer}}</span>
              <i class="garbage-icon" @click.stop="deleteFavorite(item)"></i>
          </li>
          <li class="close-btn" @click.stop="close()">
              <span>关闭</span>
          </li>
      </ul>
  </div>
</template>
<script>
import { mapGetters,mapActions } from "vuex";
export default {
    data(){
        return{
            isDisplay:true
        }
    },
    methods:{
        close(){
            this.$emit('close');
        },
        // 删除一首播放过的歌曲
        deleteFavorite(item){
            this.deletePlayHisList(item);
            console.log("删除一首")
        },
        //删除全部播放过的歌曲
        deleteAll(){
            let flag = 1;//传过去1，代表删除全部
            this.deletePlayHisList(flag);
            console.log("删除全部")
        },
        ...mapActions([
            'deletePlayHisList'
        ])
    },
    computed:{
        ...mapGetters([
            'playHisList'
        ])
    }
}
</script>


