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
<scroll  :data="songList" :pullup="pullup">
    <div class="recommend">
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
     </div>
     </scroll>
</template>
<script>
    // import {getHotRecomend} from "api/recommend";
    import {ERR_OK} from 'api/config';
    import Scroll from 'base/scroll';
    import { Indicator } from 'mint-ui';
    import {getRecommend,getHotRecommend} from 'api/index'
export default {
    components:{Scroll},
    data(){
        return{
            sliderList:[],
            songList:[],
            pullup:true
        }
    },
    created(){
        this._getRecommend();
        this._getHotRecommend();
    },
    methods:{
        _getRecommend(){
            // Indicator.open('加载中...');
            getRecommend().then(res => {
                if(res.code ===  ERR_OK){
                    Indicator.close();
                    this.sliderList = res.data.slider;
                    if (res.data.songList.length>0) {
                        this.songList   = res.data.songList;
                    }else{
                        
                    }
                }
                console.log("songList数据为空");
            });
        },
        _getHotRecommend(){
            // Indicator.open('加载中...');
            getHotRecommend().then(res => {
                // Indicator.close();
                if(res.code ===  ERR_OK){
                    console.log('热门专辑',res.data);
                }
            });
        }
    }
}
</script>

