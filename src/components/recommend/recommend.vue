<style lang="less">
@import '../../assets/less/var.less';
.recommend-wrap{
    position: fixed;
    width: 100%;
    top:2.5rem;
    bottom:0;
    .scroll{
        height:100%;
        overflow: hidden;
        .recommend{
            .slider{
                height: 6rem;
            }
            .recommend-special{
                margin-top:10px;
                .recommend-title{
                    text-align: center;
                }
                ul{
                    width:90%;
                    margin:0 auto;
                }
                .recommend-list{
                    
                    border-bottom:1px solid @underlineColor;
                    display:flex;
                    display: -webkit-flex;
                    box-sizing: border-box;
                    padding:5px 0;
                    .item-img{
                        flex: 0 0 60px;
                    }
                    .description-text{
                        display: flex;
                        flex-direction: column;
                        justify-content:center;
                        .singername{
                            font-size:12px;
                        }
                    }
                } 
            }
        }
    }
}

</style>
<template>
<div class="recommend-wrap">
     <scroll  :data="songList" class="scroll" :pullup="pullup">
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
                <div class="recommend-title">今日推荐</div>
                <ul>
                    <li class="recommend-list" v-for="(item,index) in songList" :key="item.songid" @click.stop="clickSong(item,index)">
                        <div class="item-img">
                            <img :src="item.img" alt="专辑封面"  width="80%" height="80%">
                        </div>
                        <div class="description-text">
                            <p v-html="item.songname"></p>
                            <h4 v-html="item.singer" class="grayFont singername"></h4>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </scroll>
</div>
</template>
<script>
    // import {getHotRecommend,getRecommend} from "api/recommend";
    import {getRecommend} from "api/recommend"
    import {ERR_OK} from 'api/config';
    import Scroll from 'base/scroll';
    import {Indicator } from 'mint-ui';
    import {getHotRecommend} from 'api/index'
    import {createNewSong} from 'common/js/song'
    import {filterSinger} from 'common/js/song'
    import {mapActions} from 'vuex'

    const TYPE_SINGER = 'single'//单人演唱
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
    },
    methods:{
        _getRecommend(){
            getRecommend().then(res => {
                if(res.code ===  ERR_OK){
                    this.sliderList = res.data.slider;
                    this._getHotRecommend();
                }
            });
        },
        _getHotRecommend(){
            getHotRecommend().then(res => {
               if (res.data.code ===  ERR_OK) {
                 this.songList = this.normalizeNewSong(res.data.list);
               }
            });
        },
        normalizeNewSong(list){
            let ret = [];
            list.forEach(element => {
                if (element.songid){
                    ret.push(createNewSong(element));
                }
            });
            return ret;
        },
        clickSong(item,index){
            this.selectPlay({
                list:this.songList,
                index:index
            })
        },
         ...mapActions([
            "selectPlay"
        ])
    }
}
</script>

