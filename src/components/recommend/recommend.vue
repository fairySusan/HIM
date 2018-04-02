<style lang="less">
@import '../../assets/less/var.less';
 .recommend{
    .slider{
        height: 6rem;
    }
    .recommend-special{
        margin-top:10px;
        .recommend-title{
            text-align: center;
        }
        .recommend-list{
            height: 1.2rem;
            border-bottom:1px solid #666;
            display:flex;
            display: -webkit-flex;
            box-sizing: border-box;
            align-items:center;
            .item-img{
                flex: 0 0 60px;
                margin:0 10rem;                
            }
            .description-text{
                display: flex;
                flex-direction: column;
                justify-content:center;
            }
        } 
    }
 }
</style>
<template>
    <div class="recommend">
    <scroll  :data="sliderList">
        <!-- 轮播图 -->
        <div class="slider">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in sliderList" :key="item.id">
                    <a href="#"><img :src="item.picUrl" alt="" width="100%" height="100%"></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 推荐专辑列表 -->
        <div class="recommend-special">
            <div class="recommend-title">热门专辑推荐</div>
            <ul>
                <li class="recommend-list" v-for="item in songList" :key="item.id">
                    <div class="item-img">
                        <img :src="item.picUrl" alt="专辑封面"  width="100%" height="100%">
                    </div>
                    <div class="description-text">
                        <p v-html="item.songListDesc"></p>
                        <h4 v-html="item.songListAuthor"></h4>
                    </div>
                </li>
            </ul>
        </div>
    </scroll>
     </div>
</template>
<script>
    import { getRecommend,getHotRecomend } from "api/recommend";
    import {ERR_OK} from 'api/config';
    import Scroll from 'base/scroll'
export default {
    components:{Scroll},
    data(){
        return{
            sliderList:[],
            songList:[]
        }
    },
    created(){
        this._getRecommend();
        this._getHotRecomend();
    },
    methods:{
        _getRecommend(){
            getRecommend().then(res => {
                if(res.code ===  ERR_OK){
                    this.sliderList = res.data.slider;
                    if (res.data.songList.length>0) {
                        this.songList   = res.data.songList;
                    }else{
                        console.log("songList数据为空");
                    }
                }
            });
        },
        _getHotRecomend(){
            getHotRecomend().then(res => {
                if(res.code ===  ERR_OK){
                    console.log(res.data);
                }
            });
        }
    }
}
</script>

