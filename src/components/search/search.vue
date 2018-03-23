<style lang="less">
@import '../../assets/less/var.less';
  .search{
    position: relative;
    .hot-search-tag{
      position: absolute;
      top: 10%;
      padding-left:10px;
      .title{
        padding-left: 10px;
      }
      .tag-wrap{
        font-size: 0;
        .name-tag{
        font-size:14px;
        background:@themeColor;
        color:white;
        border-radius: 99px;
        display: inline-block;
        padding:8px 10px;
        margin:5px;
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
       <mt-cell
        v-for="item in result"
        :title="item.title"
        :key="item.title"
        :value="item.value">
      </mt-cell>
    </mt-search>
    <suggest @select="saveSearch" :query="value"></suggest>
     <div class="hot-search-tag" v-if="showTags">
      <h4 class="title">热门搜索歌曲</h4>
      <ul class="tag-wrap">
        <li class="name-tag" v-for="item in hotkey" :key="item.n" @click="queryItem(item.k)">{{item.k}}</li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import {getHotKey} from 'api/search'
import {ERR_OK} from 'api/config'
import Suggest from './suggest'
import {mapActions} from 'vuex'
export default {
  components:{
    Suggest
  },
  data(){
    return{
      value:'',
      result:[],
      hotkey:[],
      showTags:true
    }
  },
  created(){
    this._getHotKey();
  },
  methods:{
    //获取关键词数据
    _getHotKey(){
      getHotKey().then(res =>{
        if(res.code ===  ERR_OK){
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
      console.log(msg);
      this.saveSearchHistory(msg);
    },
    ...mapActions([
      'saveSearchHistory'
    ])
  }
}
</script>
