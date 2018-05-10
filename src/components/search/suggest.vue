// 搜索歌曲建议组件
<style lang="less">
@import '../../assets/less/var.less';
    .suggest{
        position: absolute;
        top:8%;
        width: 100%;
        background:@purePurple;
        z-index: 1000;
        .result-wrapper{
            margin:0 10px 0 10px;
            .result-list{
                border-bottom:1px solid @underlineColor;
                padding:5px 10px;
                .icon-mine:before{
                    content:'/e912';
                }
                .text{
                    display: flex;
                    flex-direction: column;
                    justify-content:center;
                    .song-name{
                        font-size:14px;
                    }
                    .singer-name{
                        font-size:12px;
                        color:#000;
                        opacity:0.5;
                    }
                }
            }
        }
    }
</style>
<template>
<!-- <scroll :data="result" :pullup="pullup"> -->
    <div class="suggest">
        <ul class="result-wrapper">
            <li class="result-list" v-for="(item,index) in result" :key="item.songid" @click="selectItem(item,index)">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="text">
                    <span class="song-name">{{item.songname}}</span>
                    <span class="singer-name">{{item.singer}}</span>
                </div>
            </li>
        </ul>
    </div>
<!-- </scroll> -->
</template>
<script type="text/ecmascript-6">
import {search} from 'api/search'
import {ERR_OK} from 'api/config'
import {filterSinger} from 'common/js/song'
import {createSong} from 'common/js/song'
import {mapActions} from 'vuex'
import { Indicator } from 'mint-ui'
import Scroll from 'base/scroll'
const TYPE_SINGER = 'singer'
export default {
    components:{Scroll},
    props:{
        query:{
            type:String,
            default:''
        },
        showSinger:{
            type:Boolean,
            default:true
        }
    },
    data(){
        return{
            page:1,
            result:[],
            pullup:true,
            value:""
        }
    },
    methods:{
        // 查询歌曲
        search(){
            Indicator.open('加载中...');
            search(this.query,this.page,this.showSinger).then(res => {
                if (res.code === ERR_OK) {
                   Indicator.close();
                   this.result = this.getResult(res.data);
                }
            })
        },
        getResult(data){
            let ret = [];
            let res = [];
            if(data.zhida && data.zhida.singerid){
                ret.push({...data.zhida,...{type:TYPE_SINGER}});//对象扩展运算符ES6
            }
            if (data.song) {
                ret = ret.concat(data.song.list);
            }
            ret.forEach((item) =>{
                if (item.songid && item.albummid) {
                    res.push(createSong(item));
                }
            });
            return res;
        },
        //根据type的值来显示不同的图标样式
        getIconCls(item){
            if(item.type === TYPE_SINGER){
                return 'icon-mine';
            }else{
                return 'icon-music';
            }
        },
        // //处理歌手的数据
        // getDisplayName(item){
        //     if (item.type === TYPE_SINGER) {
        //         return item.singername;
        //     }else{
        //         return filterSinger(item.singer);
        //     }
        // },
        //点击搜索出来的歌曲事件
        selectItem(item,index){
            this.$emit('select', item,index);
            this.selectPlay({
                list:this.result,
                index:index
            })
        },
        ...mapActions([
            "selectPlay"
        ])
    },
    watch:{
        //监听查询参数的改变
        query(){
            this.search();
        }
    }
}
</script>