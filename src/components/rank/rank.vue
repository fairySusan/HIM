<style lang="less">
@import '../../assets/less/var.less';
 .rank{
    .rank-ul{
      margin:10px;
      .rank-list{
        display: flex;
        display: -webkit-flex;
        flex-direction: row;
        align-items:center;
        background:white;
        margin-bottom:10px;
        .rank-img{
          flex: 0 0 100px;
        }
        .rank-item{
          margin-left:10px;
          width: 7rem;
          .rank-title{
            font-size:14px;
            margin-bottom:10px;
          }
          .song-rank{
            margin: 0;
            padding:0;
            .song-item{
              margin-bottom:3px;
              .song-name{
                font-size: 12px;
                margin: 0 5px 0 5px;
              }
              .singer-name,.song-num{
                color:rgba(0,0,0,.5);
                font-size:12px;
              }
            }
          }
        }
        .go-icon{
          position: absolute;
          right:20px;
        }
      }
    }
  }
    
</style>
<template>
  <div class="rank">
    <ul class="rank-ul">
      <li class="rank-list"  v-for="listItem in rankSongList.topList" :key="listItem.id" @click="clickRankItem(listItem)">
        <div class="rank-img"><img :src="listItem.picUrl" alt="专辑图片" width="100%" height="100%"></div>
        <div class="rank-item">
          <h6 class="rank-title">{{listItem.topTitle}}</h6>
          <ol class="song-rank">
            <li class="song-item ellipsis" v-for="(song,index) in listItem.songList" :key="song.songname">
              <span class="song-num">{{index+1}}</span>
                <span class="song-name">{{song.songname}}</span>
                <span class="singer-name"> - {{song.singername}}</span>
            </li>
          </ol>
        </div>
        <span class="go-icon">&gt</span>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>
<script>
import { getRankList } from "api/rank";
import {ERR_OK} from 'api/config';
import {mapMutations} from 'vuex'

export default {
  data(){
    return{
      rankSongList:[]
    }
  },
  created(){
    this._getRankList();
  },
  methods:{
    _getRankList(){
      getRankList().then(res => {
         if(res.code ===  ERR_OK){
            this.rankSongList = res.data;
         }
      })
    },
    //点击排行榜list跳转到排行榜详情页
    clickRankItem(item){
      this.$router.push({path:`/rank/${item.id}`});
      this.setTopList(item);
    },
    ...mapMutations({
        setTopList:'SET_TOP_LIST'
    })
  }
}
</script>


