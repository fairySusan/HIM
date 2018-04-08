<style lang="less">
@import '../../assets/less/var.less';
  .search{
    position: relative;
    .mint-search{
      .mint-searchbar-cancel{
        color:#fff;
      }
    }
    .float-panel{
      position: absolute;
      top: 10%;
      padding-left:10px;
      .hot-search-tag{
        .title{
          padding-left: 10px;
          color:rgba(0,0,0,.5);
          font-size:12px;
        }
        .tag-wrap{
          font-size: 0;
          .name-tag{
            font-size:12px;
            background:@themeColor;
            color:white;
            border-radius: 99px;
            display: inline-block;
            padding:5px 10px;
            margin:5px;
          }
        }
      }
      .history-panel{
        margin:10px;
        .his-Title,.clearHis{
          font-size:14px;
        }
        .clearHis{
          font-size:14px;
          text-decoration: underline;
        }
        .history-list{
          padding:10px 0;
          border-bottom:1px solid @underlineColor;
          .cancel-tag{
            font-size: 16px;
          }
        }
      } 
    }
  }
</style>
<template>
  <div class="search">
    <mt-search
      v-model="value"
      cancel-text="取消"
      placeholder="搜索歌曲、歌手"
      :result.sync="result"
      :autofocus=true>
    </mt-search>
    <suggest @select="saveSearch" :query="value"></suggest>

    <div class="float-panel">
      <!-- 热门搜索歌曲tag -->
      <div class="hot-search-tag" v-if="showTags">
        <h4 class="title">热门搜索歌曲</h4>
        <ul class="tag-wrap">
          <li class="name-tag" v-for="item in hotkey" :key="item.n" @click="queryItem(item.k)">{{item.k}}</li>
        </ul>
      </div>

      <!-- 搜索历史显示ul -->
      <div  class="history-panel" v-if="showTags">
          <h6 class="his-Title grayFont fl">搜索历史</h6>
          <h6 class="clearHis grayFont fr" @click="clearAllHistory()">清除历史</h6>
          <ul class="clearfix">
            <li class="history-list" v-if="historyList.length>0" v-for="item in historyList" :key="item.songid">
              <div class="text">
                  <span class="song-name">{{item.songname}}</span>
                  <i class="cancel-tag fr grayFont" @click="clearSingleHis(item)">x</i>
              </div>
            </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from './suggest'
import {mapActions} from 'vuex'
import state from '../../store/state'
import { Indicator } from 'mint-ui';
export default {
  components:{
    Suggest
  },
  data(){
    return{
      value:'',
      result:[],
      hotkey:[],
      showTags:true,
      historyList:state.searchHistory
    }
  },
  created(){
    this._getHotKey();
  },
  methods:{
    //获取关键词数据
    _getHotKey(){
      getHotKey().then(res =>{
        // Indicator.open('加载中...');
        if(res.code === 0){
          // Indicator.close();
          this.hotkey = res.data.hotkey.slice(0,10);//选择前十个数据
        }
      })
    },
    queryItem(name){
      this.value = name;
      if (this.value !== '' && this.value !== null) {
        this.showTags = false;
      }
    },
    //保存搜索历史记录
    saveSearch(msg){
      this.saveSearchHistory(msg);
    },
    ...mapActions([
      'saveSearchHistory',
      'clearSearchHistory'
    ]),
    //清除全部历史记录
    clearAllHistory(){
      this.clearSearchHistory(1);
      this.historyList = state.searchHistory;
    },
    //清除单个历史记录
    clearSingleHis(item){
      this.clearSearchHistory(item);
      this.historyList = state.searchHistory;
    }
  }
}
</script>
