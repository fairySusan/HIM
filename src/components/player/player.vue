<style lang='less'>
@import '../../assets/less/var.less';
    .player{
        #screen-player{
            .arrow-icon{
                position: absolute;
                left:10px;
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
           .tools-bar{
               position: fixed;
               bottom: 0;
               left:0;
               right:0;
               margin:auto;
               width:90%;
               .tools-btns{
                   display: flex;
                   display: -webkit-flex;
                   flex-direction: row;
                   justify-content: center;
                   align-items:center;
                  .playMode-icon,.last-icon,.next-icon,.play-icon,.stop-icon,.like-icon{
                      margin:0 15px;
                  }
               }
           }
        }
        #mini-player{
            position: fixed;
            z-index:1002;
            bottom: 0;
            height:60px;
            background:@themeColor;
            width:100%;
            border:1px solid @underlineColor;
            .minilyric-img{
                width:50px;
                height:50px;
                margin-left:10px;
                position: absolute;
                top:50%;
                transform: translate(0,-50%);
                img{
                    vertical-align: middle;
                    border-radius: 50%;
                }
            }
            .text{
                position: absolute;
                top:50%;
                left:70px;
                transform: translate(0,-50%);
                .song-name{
                    font-size:16px;
                    color:white;
                }
                .singer-name{
                    font-size:12px;
                }
            }
            .icon-btn{
                position: absolute;
                z-index:1002;
                top:50%;
                right:10px;
                transform: translate(0,-50%);
            }
        }
    }
</style>
<template>
    <div class="player clearfix" v-if="playList.length>0">
<!-- 全屏的播放器 -->
    <transition name="normal">
        <div id="screen-player" class="cover" v-if="fullScreen" ref="screenPlayer">
            <i class="arrow-icon" @click="clickReturn()">&lt</i>
            <div class="des-title">
                <span class="song-name">{{currentSong.songname}}</span>
                <h6 class="singer-name">{{currentSong.singer}}</h6>
            </div>
            <div class="lyric-img" ref="lyricImg">
                <img :src="currentSong.img" alt="专辑封面">
            </div>
            
            <!-- 下面的工具栏 -->
            <div class="tools-bar">
                <div>
                    <span class="play-time"></span>
                    <progress-bar :percent="percent"></progress-bar>
                    <span class="total-time"></span>
                </div>
                <div class="tools-btns">
                    <button class="playMode-icon"></button>
                    <button class="last-icon" @click="playLast"></button>
                    <button class="play-icon" @click="togglePlaying"></button>
                    <button class="next-icon" @click="playNext"></button>
                    <button class="like-icon"></button>
                </div>
            </div>
        </div>
    </transition>
<!-- 播放历史列表 -->
<played-list v-show="isDisplay" @close="closePlayHis()"></played-list>
<!-- mini的播放器 -->
    <transition class="mini">
        <div id="mini-player" v-if="!fullScreen" @click="clickMini">
            <div class="minilyric-img fl">
                <img :src="currentSong.img" alt="专辑封面" width="100%" height="100%">
            </div>
            <div class="text fl">
               <h6 class="song-name">{{currentSong.songname}}</h6>
               <span class="singer-name grayFont">{{currentSong.singer}}</span> 
            </div>
            <div class="icon-btn">
                <button class="state-btn play-icon"></button>
                <button class="list-btn playList-icon" @click.stop="showPlayHis()"></button>
            </div>
        </div>
    </transition>
    <audio ref="audio" :src="currentSong.url">
        <source :src="currentSong.url" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
    </audio>
    </div>
</template>
<script>
import {mapGetters,mapMutations} from 'vuex'
import animations from 'create-keyframe-animation'
import progressBar from 'base/progressBar'
import playedList from '../common/playedList'
export default{
    components:{
        progressBar,
        playedList
    },
    data(){
        return{
            percent:null,//播放进度百分比
            currentTime:null,//当前播放的时间
            isDisplay:false//控制播放历史列表是否可见
        }
    },
    created(){

    },
    methods:{
        //点击返回按钮隐藏全屏播放器
        clickReturn(){
            this.SetFullScreen(false);
        },
        //点击mini播放器显示全屏播放器
        clickMini(){
             this.SetFullScreen(true);
        },
        ...mapMutations({
            SetFullScreen: 'SET_FULL_SCREEN',
            setPlaying:'SET_PLAYING',
            setCurrentIndex:'SET_CURRENT_INDEX'
        }),
        enter(el,done){
            const {x,y,scale} = this.getPosAndScale();
            let animation = {
                0:{
                    transform:'translate3d(${x}px,${y}px,0) scale(${scale})'
                },
                60:{
                    transform:'translate3d(0,0,0) scale(1.1)'
                },
                100:{
                    transform:'translate3d(0,0,0) scale(1)'
                }
            }
            animations.registerAnimation({
                name:'move',
                animation,
                presets:{
                    duration:400,
                    easing:'line'
                }
            });
            animations.runAnimation(this.$refs.lyricImg,'move',done);
        },
        afterEnter(el,done){
            animations.unregisterAnimation('move');
            this.$refs.lyricImg.style.animation = '';
        },
        leave(el,done){
            this.$refs.lyricImg.style.transition = 'all 0.4s';
            const {x,y,scale} = this.getPosAndScale();
        },
        leaveEnter(el,done){

        },
        getPosAndScale(){
            const targetWidth = 50;
            const paddingLeft = 35;
            const paddingBottom = 30;
            const paddingTop = 80;
            const width = window.innerWidth*0.8;
            const scale = targetWidth/width;
            const x = -(window.innerWidth/2-paddingLeft);
            const y = window.innerHeight-paddingTop-width/2-paddingBottom;
            return {x,y,scale}
        },
        //暂停播放按钮点击事件
        togglePlaying(){
            this.setPlaying(!this.playing);
        },
        //上一首播放按钮点击事件
        playLast(){
            let index =  this.currentIndex>0 ? this.currentIndex-1:this.currentIndex;
            this.setCurrentIndex(index);
        },
        //下一首播放按钮点击事件
        playNext(){
             this.setCurrentIndex(this.currentIndex+1);
        },
        // 显示播放历史列表组件
        showPlayHis(){
            this.isDisplay = true;
        },
        // 关闭播放历史列表组件
        closePlayHis(){
            this.isDisplay = false;
        }
    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing',
            'currentIndex'
        ])
    },
    watch:{
        currentSong(){
            this.$nextTick(()=>{
                this.currentTime = this.$refs.audio.currentTime;
                this.$refs.audio.play();
            }) 
        },
        percent(){
            return this.currentTime/this.currentSong.duration;
        },
        //监听playing控制音乐播放还是暂停
        playing(newPlaying){
            const audio = this.$refs.audio;
            this.$nextTick(()=>{
                newPlaying ? audio.play() : audio.pause()
            })
        }
    }
}
</script>