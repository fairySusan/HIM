<style lang="less">
@import '../../assets/less/var.less';
 .recommend{
    .slider{
        height: 12rem;
        background:pink;
    }
    .recommend-special{
        margin-top:10px;
        .recommend-title{
            text-align: center;
        }
        .recommend-list{
            height: 5rem;
            background:@themeColor;
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
                    <a href="#"><img :src="item.picUrl" alt="" width="100%" height="100%"></a>
                </mt-swipe-item>
            </mt-swipe>
        </div>
        <!-- 推荐专辑列表 -->
        <div class="recommend-special">
            <div class="recommend-title">热门歌曲推荐</div>
            <ul>
                <li class="recommend-list">
                    <img src="" alt="专辑封面" class="fl">
                    <div>
                        <h4>歌曲标题</h4>
                        <p>简介</p>
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
            sliderList:[]
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
                }
            });
        }
    }
}
</script>

