<style lang="less">
 .rank{
    .rank-ul{
      margin:10px;
      .rank-list{
        display: flex;
        display: -webkit-flex;
        align-items:center;
        background:white;
        margin-bottom:10px;
        .rank-img{
          flex: 0 0 100px;
        }
        .rank-item{
          margin-left:1rem;
          .rank-title{
            font-size:16px;
          }
          .song-rank{
            margin: 0;
            padding:0;
            .song-item{
              display: flex;
              display: -webkit-flex;
              justify-content: content;
              .song-num{
                // margin:5px;
              }
              .song-name{
                font-size: 14px;
                margin: 0 5px 0 5px;
              }
              .songer-name,.song-num{
                color:#000;
                opacity:0.5;
              }
            }
          }
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
                <span class="songer-name"> - {{song.singername}}</span>
            </li>
          </ol>
        </div>
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


