/* 歌曲详情页通用组件 */
<style lang='less'>
@import '../../assets/less/var.less';
    
        .musiclist{
            .singer-des{
                position:relative;
                .singer-name{
                    position:absolute;
                    top:5%;
                    right:0;
                    bottom:0;
                    left:0;
                    text-align:center;
                    font-size:24px;
                    color:white;
                    .return-icon{
                        position:absolute;
                        left:10px;
                    }
                }
                .singer-img{
                    height:9rem;
                    overflow:hidden;
                }
            }
            .scroll{
                height: 100%;
                overflow:hidden;
                .songs-list{
                    margin:20px;
                    .song-item{
                        background:#fff;
                        padding:5px 0;
                        border-bottom:1px solid @underlineColor;
                        .des-text{
                            font-size:12px;
                        }
                    }
                
                }
            }
        }
</style>
<template>
<div class="musiclist">
        <!-- 歌手简介 -->
        <div class="singer-des">
            <h6 class="singer-name">
                <!-- <span class="return-btn" @click="returnClick">&lt</span> -->
                <slot></slot>
                {{detailInfo.title}}
            </h6>
            <div class="singer-img">
                <img :src="detailInfo.imgUrl" alt="歌手图片" width="100%">
            </div>
            <i class="play-icon"></i>
        </div>
        <!-- 歌曲目录 -->
        <div style="position:fixed;top:9rem;bottom:0;">
        <scroll  :data="songList" class="scroll" :pullup="pullup">
        <ul class="songs-list">
            <li class="song-item" v-for="(item,index) in songList" :key="item.songid" @click="clickSong(item,index)">
                <h6 class="song-name">{{item.songname}}</h6>
                <span class="des-text grayFont">{{item.singer}}-{{item.albumname}}</span>
            </li>
        </ul>
        </scroll>
        </div>
    </div>
</template>
<script>
import {mapActions} from 'vuex'
import Scroll from 'base/scroll';
export default{
    components:{Scroll},
    props:["songList","detailInfo"],
    data(){
        return{
            pullup:true
        }
    },
    created(){

    },
    methods:{
        // 点击歌曲事件
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