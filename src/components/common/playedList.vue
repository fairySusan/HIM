/* 用户的播放列表 */
<style lang="less">
@import '../../assets/less/var.less';
    #playHistoryList{
        position: fixed;
        bottom: 0;
        z-index:1003;
        width:100%;
        .list-wrap{
            max-height:25rem;
            background: white;
            li:not(.close-btn){
                height: 30px;
                line-height: 30px;
                padding: 0 10px;
                border-bottom: 1px solid @underlineColor;
                .song-name{

                }
                .singer-name{
                    font-size:12px;
                }
                .del-icon{
                   
                }
            }
            .close-btn{
                height: 40px;
                line-height: 40px;
                text-align: center;
            }
        }
    }
</style>
<template>
  <div id="playHistoryList">
      <ul class="list-wrap">
          <li>
              <span class="song-name">歌曲名字</span><span class="singer-name grayFont">-演唱者</span>
              <i class="del-icon fr">删除</i>
          </li>
          <li class="close-btn" @click="close()">
              <span>关闭</span>
          </li>
      </ul>
  </div>
</template>
<script>
export default {
  data(){
      return{
          isDisplay:true
      }
  },
  methods:{
      close(){
          this.$emit('close');
      }
  }
}
</script>


