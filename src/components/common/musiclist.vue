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
                .return-btn{
                    position:absolute;
                    left:10px;
                }
            }
            .singer-img{
                height:22rem;
                overflow:hidden;
            }
        }
        .songs-list{
            margin:20px;
            .song-item{
                background:white;
                padding:5px 0;
                margin-bottom:10px;
                border-bottom:1px solid @underlineColor;
                .des-text{
                    font-size:12px;
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
                {{singerInfo.singername}}
            </h6>
            <div class="singer-img">
                <img :src="singerInfo.singerImg" alt="歌手图片" width="100%">
            </div>
            <i class="play-icon"></i>
        </div>
        <!-- 歌曲目录 -->
        <ul class="songs-list">
            <li class="song-item" v-for="item in musicData" :key="item.songid">
                <h6 class="song-name">{{item.songname}}</h6>
                <span class="des-text grayFont">{{item.singer}}-{{item.albumname}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default{
    props:["musicData","singerInfo"],
    data(){
        return{

        }
    },
    created(){

    },
    methods:{
        
    }
}
</script>