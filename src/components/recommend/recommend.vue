<style lang="less">
@import '../../assets/less/var.less';
 .recommend{
    .slider{
        height: 12rem;
        // background:pink;
    }
    .recommend-special{
        margin-top:10px;
        .recommend-title{
            text-align: center;
        }
        .recommend-list{
            height: 5rem;
            border-bottom:1px solid #666;
            // background:@themeColor;
            .special-img{
                margin-right:0.6rem;                
            }
            
        } 
    }
 }
</style>
<template>
    <div class="recommend">
        <!-- 轮播图 -->
        <div class="slider">
            <mt-swipe :auto="4000">
                <mt-swipe-item v-for="item in sliderList" :key="item.id">
                    <a :href="item.linkUrl"><img :src="item.picUrl" alt="" width="100%" height="100%"></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 推荐专辑列表 -->
        <div class="recommend-special">
            <div class="recommend-title">热门专辑推荐</div>
            <ul>
                <li class="recommend-list" v-for="item in songList" :key="item.id">
                    <img :src="item.picUrl" alt="专辑封面" class="special-img fl" width="15%" height="15%">
                    <div class="description-text">
                        <p>{{item.songListDesc}}</p>
                        <h4>{{item.songListAuthor}}</h4>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    import { getRecommend } from "../../api/recommend";
    import {ERR_OK} from '../../api/config'
export default {
    data(){
        return{
            sliderList:[],
            songList:[]
        }
    },
    created(){
        this._getRecommend();
    },
    methods:{
        _getRecommend(){
            getRecommend().then(res => {
                if(res.code ===  ERR_OK){
                    this.sliderList = res.data.slider;
                    this.songList   = res.data.songList;
                }
            });
        }
    }
}
</script>

