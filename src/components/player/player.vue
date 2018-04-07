<style lang='less'>
@import '../../assets/less/var.less';
    .player{
        #screen-player{
            .mask{
                width:100%;
                height:100%;
                background: rgba(0,0,0,.3);
                position: absolute;
                top:0;
                left:0;
                right:0;
                bottom:0;
            }
            .blurBack{
                width:100%;
                height:100%;
                background-size:cover;
                position: absolute;
                z-index:-1;
                top:0;
                left:0;
                bottom:0;
                right:0;
                content:'';
                -webkit-filter:blur(5px);
                filter:blur(15px);
            }
            .des-title{
                position: relative;
                text-align:center;
                height: 1.5rem;
                background-color:@themeColor;
                color:#fff;
                .arrow-icon{
                    position: absolute;
                    top:50%;
                    left:10px;
                    transform: translate(0,-50%);
                }
                .title-wrap{
                    position: absolute;
                    top:50%;
                    left:50%;
                    transform: translate(-50%,-50%);
                }
                .singer-name{
                    font-size:10px;
                    -webkit-text-size-adjust: none;
                }
            }
            .middle{
                position: fixed;
                width: 100%;
                top: 80px;
                bottom: 170px;
                white-space: nowrap;
                .middle-r{
                    display: inline-block;
                    width:100%;
                    height: 100%;
                    vertical-align: top;
                    overflow: hidden;
                    .lyric-wrap{
                        text-align:center;
                        padding:15px 0;
                        
                        p{
                            margin:10px 0;
                            color:rgba(0,0,0,.5);
                            &.current-line{
                                color:#fff;
                            }
                        }
                    }
                }
                .middle-l{
                    display: inline-block;
                    width:100%;
                    height: 100%;
                    vertical-align: top;
                    overflow: hidden;
                    .lyric-img{
                        text-align:center;
                        margin-top:10%;
                        animation: rotate-animation 10s infinite linear;
                        img{
                            border-radius:50%;
                            border:10px solid rgba(0,0,0,.4);
                        }
                    }
                }
            }
           
            .play-time{
                position: fixed;
                bottom:2.5rem;
                left:50%;
                transform: translate(-50%,0);
                font-size:10px;
                color:#bbb;
            }
           .tools-bar{
               position: fixed;
               bottom: 0;
               left:0;
               right:0;
               margin:auto;
               width:90%;
               height:2.5rem;
               .tools-btns{
                   display: flex;
                   display: -webkit-flex;
                   flex-direction: row;
                   justify-content: center;
                   align-items:center;
                   margin-top:10px;
                  .order-icon,
                  .random-icon,
                  .last-icon,
                  .next-icon,
                  .play-icon,
                  .stop-icon,
                  .like-icon,
                  .nolike-icon{
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
                position: absolute;
                top:0;
                right:0;
                left:0;
                bottom:0;
                margin:auto 10px;
                animation: rotate-animation 10s infinite linear;
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
        <div id="screen-player" class="cover"  v-if="fullScreen" ref="screenPlayer">
            <img class="blurBack cover" :src="currentSong.img" alt="">
            <div class="mask"></div>
            <div class="des-title">
                <i class="arrow-icon slide-down" @click="clickReturn()"></i>
                <div class="title-wrap"> 
                    <span class="song-name">{{currentSong.songname}}</span>
                    <h6 class="singer-name">{{currentSong.singer}}</h6>
                </div>
            </div>

            <div
            class="middle"  
            @touchstart.prevent="movetouchstart"
            @touchmove.prevent="movetouch"
            @touchend.prevent="movetouchend">
                <div class="middle-l" ref="middleL">
                    <div class="lyric-img" ref="lyricImg" :style="{animationPlayState:isRotate}">
                        <img :src="currentSong.img" alt="专辑封面" width="80%" height="80%">
                    </div>
                </div>

                <!-- 歌词部分 -->
                <scroll  class="middle-r"  ref="lyricList" :data="currentLyric.lines">
                    <div class="lyric-wrap">
                        <p v-for="(item,index) in currentLyric.lines" :class="{'current-line':currentLineNum==index}">{{item.txt}}</p>
                    </div>
                </scroll>
            </div>
            
            <!-- 下面的工具栏 -->
            <div class="play-time">
                <span>{{currentTime | filterTime}}/{{totalTime | filterTime}}</span>
            </div>
            <div class="tools-bar">
                <div>
                    <progress-bar :percent="percent"></progress-bar>
                </div>
                <div class="tools-btns">
                    <button :class="playModeClass"></button>
                    <button class="last-icon" @click="playLast"></button>
                    <button v-bind:class="playing ? 'play-icon' : 'stop-icon'" @click="togglePlaying"></button>
                    <button class="next-icon" @click="playNext"></button>
                    <button :class="isLikeClass" @click="favoriteSong"></button>
                </div>
            </div>
        </div>
    </transition>

<!-- mini的播放器 -->
    <transition class="mini">
        <div id="mini-player" v-if="!fullScreen" @click="clickMini">
            <!-- 播放历史列表 -->
            <played-list v-show="isDisplay" @close="closePlayHis()"></played-list>
            <div class="minilyric-img fl" ref="lyricImg" :style="{animationPlayState:isRotate}">
                <img :src="currentSong.img" alt="专辑封面" width="100%" height="100%">
            </div>
            <div class="text fl">
               <h6 class="song-name">{{currentSong.songname}}</h6>
               <span class="singer-name grayFont">{{currentSong.singer}}</span> 
            </div>
            <div class="icon-btn">
                <button :class="['state-btn',playing?'play-mini':'stop-mini']" @click.stop="togglePlaying"></button>
                <button class="list-btn playList-icon" @click.stop="showPlayHis()"></button>
            </div>
        </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @timeupdate="updataTime" @canplay="getTotalTime">
        <source :src="currentSong.url" type="audio/mpeg">
        您的浏览器不支持 audio 元素。
    </audio>
    </div>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {getLyric} from 'api/index'
import animations from 'create-keyframe-animation'
import progressBar from 'base/progressBar'
import {prefixStyle} from 'common/js/dom'
import playedList from '../common/playedList'
import Lyric from 'lyric-parser'
import Scroll from 'base/scroll'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transitionDuration')

export default{
    components:{
        progressBar,
        playedList,
        Scroll
    },
    data(){
        return{
            percent:null,//播放进度百分比
            currentTime:0,//当前播放的时间
            totalTime:0,//当前歌曲的总时间
            isDisplay:false,//控制播放历史列表是否可见
            playModeClass:'order-icon',
            isLikeClass:'nolike-icon',
            isRotate:'',//专辑封面是否旋转
            currentLyric:'',//歌词
            currentLine:'',
            currentLineNum:0,
            currentShow:0,//显示CD还是歌词，0：CD，1:歌词
            touch:{}
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
        // 更新歌曲播放的时间
        updataTime(e){
            this.currentTime = e.target.currentTime;
        },
        // 获得歌曲的总时长
        getTotalTime(e){
            this.totalTime = e.target.duration;
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
        },
        // 点击收藏按钮收藏这首歌
        favoriteSong(){
            this.saveFavoriteList(this.currentSong);
            this.setLikeState(!this.isLike);
        },
        // 获得对应的歌词
        getLyric(){
            getLyric(this.currentSong.songid).then(res=>{
                this.currentLyric = new Lyric(res.data.lyric,this.lyricHandler);
                if(this.playing){
                    this.currentLyric.play();
                }else if(!this.playing){
                    this.currentLyric.stop();
                }
            })
        },
        lyricHandler({lineNum,txt}){
            this.currentLineNum = lineNum;
        },
        movetouchstart(e){
            this.touch.initiated = true;
            const touch =  e.touches[0];
            this.touch.startX = touch.pageX;
            this.touch.startY = touch.pageY;
        },
        movetouch(e){
            if (!this.touch.initiated) {
                return;
            }
            const touch =  e.touches[0];
            const deltaX = touch.pageX - this.touch.startX;
            const deltaY = touch.pageY - this.touch.startY;
            if(Math.abs(deltaX)<Math.abs(deltaY)){
                return;
            }
            const left = this.currentShow === 0 ? 0 : -window.innerWidth;
            const offsetWidth =Math.min(0,Math.max(-window.innerWidth,left+deltaX));
            this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
            this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
            this.$refs.lyricList.$el.style[transitionDuration] = 0;
            this.$refs.middleL.style.opacity = 1 - this.touch.percent
            this.$refs.middleL.style[transitionDuration] = 0
        },
        movetouchend(){

        },
        ...mapMutations({
            SetFullScreen: 'SET_FULL_SCREEN',
            setPlaying:'SET_PLAYING',
            setCurrentIndex:'SET_CURRENT_INDEX',
            setLikeState:'SET_LIKE_STATE'
        }),
        ...mapActions([
            'saveFavoriteList',
            'savePlayHisList'
        ])
    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playList',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'isLike'
        ])
    },
    watch:{
        currentSong(newCurrentSong){
            this.getLyric();//获得对应歌词
            this.$nextTick(()=>{
                this.$refs.audio.play();
            });
            this.savePlayHisList(newCurrentSong);
        },
        // 获取播放时间占总时间的百分比，传给progressbar组件
        currentTime(){
            this.percent = this.currentTime/this.totalTime
            return this.percent;
        },
        //监听playing控制音乐播放还是暂停
        playing(newPlaying){
            this.$nextTick(()=>{
                const audio = this.$refs.audio;
                newPlaying ? audio.play() : audio.pause()
                //监听播放还是停止，来控制专辑封面是否旋转
                this.isRotate = newPlaying?'running':'paused';
            })
        },
        mode(){
            if (mode === 0) {
                return this.playModeClass = 'order-icon';
            }else if(mode === 1){
                return this.playModeClass = 'loop-icon';
            }else if(mode === 2){
                return this.playModeClass = 'random-icon';
            }
        },
        isLike(){
            this.isLikeClass =  this.isLike ? 'like-icon' : 'nolike-icon';
        }
    },
    filters:{
        filterTime:function(value){
            value = value | 0;
            let minute = value / 60 | 0;
            let second = value % 60;
            minute = minute<10?('0'+minute):minute;
            second = second<10?('0'+second):second;
            return `${minute}:${second}`

        }
    }
}
</script>