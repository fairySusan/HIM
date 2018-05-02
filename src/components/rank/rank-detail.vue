<style lang='less'>
@import '../../assets/less/var.less';
    .rank-detail{
        position:fixed;
        z-index:1000;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:white;
    }
</style>

<template>
<transition name="slide">
 <div class="rank-detail">
    <music-list :songList="topSongList" :detailInfo="topInfo">
        <span class="return-icon" @click="returnClick"></span>
    </music-list>
 </div>
</transition>
</template>

<script>
import {mapGetters} from 'vuex';
import {getRankDetail} from 'api/rank'
import {getVKey} from 'api/singer'
import {ERR_OK} from 'api/config';
import {createSong} from 'common/js/song'
import musicList from '../common/musiclist'
import { Indicator } from 'mint-ui';


export default {
    components:{
        musicList
    },
    data(){
        return{
            topSongList:[],
            topInfo:{
                imgUrl:'',
                title:''
            },
            key:''
        }
    },
    created(){
        this._getRankDetail();
        // this._getVKey();
    },
    methods:{
        _getRankDetail(){
            getRankDetail(this.topList.id).then(res => {
                // Indicator.open('加载中...');
                if (!this.topList.id) {
                    this.$router.push('/rank');
                    return;
                }
                if(res.code ===  ERR_OK){
                    Indicator.close();
                    this.topSongList = this.normalizeSongs(res.songlist);
                    this.topInfo.imgUrl = res.topinfo.pic_album;
                    this.topInfo.title = res.topinfo.ListName;
                }
            })
        },
        // _getVKey(){
        //     getVKey().then(res=>{
        //         this.key = res.data.items[0].vkey;
        //         console.log("res.data",this.key);
        //     })
        // },
        //处理获得的歌手详情数据
        normalizeSongs(list){
            let ret = [];
            list.forEach((item) =>{
                let musicDataItem = item.data;
                if (musicDataItem.songid && musicDataItem.albummid) {
                    ret.push(createSong(musicDataItem));
                }
            });
            return ret;
        },
        //点击返回按钮跳转事件
        returnClick(){
            this.$router.push('/rank');
        }
    },
    computed:{
        ...mapGetters([
            'topList'
        ])
    }
}
</script>