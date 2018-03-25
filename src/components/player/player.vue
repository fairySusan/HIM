<style lang='less'>
    .player{
        #screen-player{
            .arrow-icon{
                
            }
            .des-title{
                text-align:center;
                .song-name,.singer-name{
                }
            }
            
            .lyric-img{
                text-align:center;
                margin-top:15%;
                img{
                    border-radius:50%;
                }
            }
        }
      .mini-player{

      }
    }
</style>
<template>
    <div class="player cover" v-show="playList.length>0">
<!-- 全屏的播放器 -->
        <div id="screen-player" v-show="fullScreen">
            <i class="arrow-icon fl">&lt</i>
            <div class="des-title">
                <span class="song-name">{{currentSong.songname}}</span>
                <h6 class="singer-name">{{currentSong.singer}}</h6>
            </div>
            <div class="lyric-img">
                <img :src="currentSong.img" alt="专辑封面">
            </div>
            <!-- 下面的工具栏 -->
            <div class="tools-bar">
                <button class="mode-btn">1</button>
                <button class="last-btn">2</button>
                <button class="next-btn">3</button>
                <button class="like-btn">4</button>
            </div>
        </div>
<!-- mini的播放器 -->
        <div id="mini-player" v-show="!fullScreen">
            <div class="minilyric-img">
                <img :src="currentSong.img" alt="专辑封面">
            </div>
            <p>
                <h6 class="song-name"></h6>
                <span class="singer-name"></span>
            </p>
            <div>
                <button class="state-btn"></button>
                <button class="list-btn"></button>
            </div>
        </div>
    </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default{
    data(){
        return{

        }
    },
    created(){

    },
    methods:{

    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong'
        ])
    }
}
</script>