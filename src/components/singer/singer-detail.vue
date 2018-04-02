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
                <span class="return-btn" @click="returnClick">&lt</span>
            </music-list>
        </div>
    </transition>
</template>
<script>
import {mapGetters} from 'vuex';
import { getSingerDetail } from "api/singer";
import {ERR_OK} from 'api/config'
import {createSong} from 'common/js/song'
import musicList from '../common/musiclist'
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
            }
        }
    },
    created(){
        this._getSingerDetail();
    },
    methods:{
        _getSingerDetail(){
            if (!this.singer.id) {
                this.$router.push('/singer');
                return;
            }
            getSingerDetail(this.singer.id).then(res =>{
                if(res.code ===  ERR_OK){
                     this.musicData = this.normalizeSongs(res.data.list);
                     this.singerImg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${res.data.singer_mid}.jpg?max_age=2592000`
                     this.singerInfo.imgUrl = this.singerImg;
                     this.singerInfo.title = res.data.singer_name;
                     console.log(this.singerInfo);
                }
            })
        },
        //处理获得的歌手详情数据
        normalizeSongs(list){
            let ret = [];
            list.forEach((item) =>{
                let musicDataItem = item.musicData;
                if (musicDataItem.songid && musicDataItem.albummid) {
                    ret.push(createSong(musicDataItem));
                }
            });
            return ret;
        },
        //点击返回按钮事件
        returnClick(){
            this.$router.push('/singer');
            console.log("runrun");
        }
    },
    computed:{
        ...mapGetters([
            'singer'
        ])
    }

}
</script>


