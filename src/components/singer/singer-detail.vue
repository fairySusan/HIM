<style lang="less">
@import '../../assets/less/var.less';
/* 把父级路由的内容给盖住 */
    .singer-detail{
        position:fixed;
        z-index:1000;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background:#fff;
    }
</style>
<template>
    <transition name="slide">
        <div class="singer-detail">
            <music-list :songList="musicData" :detailInfo="singerInfo">
                <span class="return-icon sprite-icon" @click="returnClick"></span>
            </music-list>
        </div>
    </transition>
</template>
<script>
import {mapGetters} from 'vuex';
import { getSingerDetail,getVKey } from "api/singer";
// import {getSingerDetail} from 'api/index'
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import musicList from '../common/musiclist'
import { Indicator } from 'mint-ui';
export default {
    components:{
        musicList
    },
    data(){
        return{
            musicData:[],
            singerImg:'',//歌手图片
            singerInfo:{
                imgUrl:'',
                title:''
            },
            key:''
        }
    },
    created(){
        // this._getVKey();
         this._getSingerDetail();
         
    },
    methods:{
        _getSingerDetail(){
            Indicator.open("加载中...");
            if (!this.singer.mid) {
                this.$router.push('/singer');
                return;
            }
            getSingerDetail(this.singer.mid).then(res =>{
                if(res.code ===  ERR_OK){
                    Indicator.close();
                    this.musicData = this.normalizeSongs(res.data.list);
                    this.singerImg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`
                    this.singerInfo.imgUrl = this.singerImg;
                    this.singerInfo.title = res.data.singer_name;
                }
            })
        },
        // _getVKey(){
        //     getVKey().then(res=>{
        //         this.key = res.key;
        //         this._getSingerDetail(res.key);
        //     })
        // },
        //处理获得的歌手详情数据
        normalizeSongs(list){
            let ret = [];
            list.forEach((item) =>{
                let musicDataItem = item.musicData;
                if (musicDataItem.songmid && musicDataItem.songid) {
                    ret.push(createSong(musicDataItem));
                }
            });
            return ret;
        },
        //点击返回按钮事件
        returnClick(){
            this.$router.push('/singer');
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ])
    }

}
</script>


