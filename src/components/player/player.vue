<style lang='less'>
@import '../../assets/less/var.less';
    .player{
        #screen-player{
            .mask{
                width:100%;
                height:100%;
                background: rgba(0,0,0,.5);
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
                position:relative;
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
                            color:rgb(150,150,150);
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
                    .running{
                        animation-play-state:running;
                    }
                    .paused{
                        animation-play-state:paused;
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
                  .loop-icon,
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
            .running{
                animation-play-state:running;
            }
            .paused{
                animation-play-state:paused;
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
    <div class="player" v-if="playList.length>0">
        <!-- 全屏的播放器 -->
        <transition name="normal"
                    @enter="enter"
                    @after-enter="afterEnter"
                    @after-leave="afterLeave"
                    >
            <div id="screen-player" class="cover"  v-show="fullScreen"  ref="screenPlayer">
                <img class="blurBack cover" :src="currentSong.img" alt="">
                <div class="mask"></div>
                <div class="des-title">
                    <i class="arrow-icon slide-down sprite-icon" @click="clickReturn"></i>
                    <div class="title-wrap"> 
                        <span class="song-name">{{currentSong.songname}}</span>
                        <h6 class="singer-name">{{currentSong.singer}}</h6>
                    </div>
                </div>

                <div
                class="middle"  
                @touchstart.prevent="movetouchstart"
                @touchmove.prevent="movetouch"
                @touchend="movetouchend">
                    <div class="middle-l" ref="middleL">
                        <div class="lyric-img" ref="lyricImg"  :class="isRotate">
                            <img :src="currentSong.img" alt="专辑封面" width="80%" height="80%">
                        </div>
                    </div>

                    <!-- 歌词部分 -->
                    <scroll  class="middle-r"  ref="lyricList" :data="currentLyric.lines">
                        <div class="lyric-wrap">
                            <p ref="lyricLines" v-if="isLyric" v-for="(item,index) in currentLyric.lines" :class="{'current-line':currentLineNum==index}">{{item.txt}}</p>
                            <p v-if="!isLyric">{{tips}}</p>
                        </div>
                    </scroll>
                </div>
                
                <!-- 下面的工具栏 -->
                <div class="play-time">
                    <span>{{currentTime | filterTime}}/{{totalTime | filterTime}}</span>
                </div>
                <div class="tools-bar">
                    <div>
                        <progress-bar :percent="percent" @percentChange="percentChange"></progress-bar>
                    </div>
                    <div class="tools-btns">
                        <button :class="playModeClass" class="sprite-icon" @click="selectMode"></button>
                        <button class="last-icon sprite-icon" @click="playLast"></button>
                        <button :class="playing ? 'stop-icon' : 'play-icon'" class="sprite-icon" @click="togglePlaying"></button>
                        <button class="next-icon sprite-icon" @click="playNext"></button>
                        <button :class="getFavoriteIcon(currentSong)" class="sprite-icon" @click="toggleFavoriteSong(currentSong)"></button>
                    </div>
                </div>
            </div>
        </transition>

        <!-- mini的播放器 -->
        <transition name="mini">
            <div id="mini-player" v-show="!fullScreen" @click="clickMini">
                <!-- 播放历史列表 -->
                <played-list v-show="isDisplay" @close="closePlayHis()"></played-list>
                <div class="minilyric-img fl" :class="isRotate">
                    <img :src="currentSong.img" alt="专辑封面" width="100%" height="100%">
                </div>
                <div class="text fl">
                <h6 class="song-name">{{currentSong.songname}}</h6>
                <span class="singer-name grayFont">{{currentSong.singer}}</span> 
                </div>
                <div class="icon-btn">
                    <button :class="['state-btn',playing?'stop-mini':'play-mini']" class="sprite-icon" @click.stop="togglePlaying"></button>
                    <button class="list-btn playList-icon sprite-icon" @click.stop="showPlayHis()"></button>
                </div>
            </div>
        </transition>
        <audio ref="audio" :src="currentSong.url" @play="ready" @error="error"  @timeupdate="updataTime" @canplay="getTotalTime" @ended="playEnd">
            <source :src="currentSong.url" type="audio/mpeg">
            您的浏览器不支持 audio 元素。
        </audio>
    </div>
</template>
<script>
import {mapGetters,mapMutations,mapActions} from 'vuex'
import {ERR_OK} from 'api/config';
// import {getLyric} from 'api/index'
// import {getLyric} from 'api/song'
import animations from 'create-keyframe-animation'
import progressBar from 'base/progressBar'
import {prefixStyle} from 'common/js/dom'
import playedList from '../common/playedList'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
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
            isRotate:null,//专辑封面是否旋转
            currentLyric:{},//歌词
            currentLine:'',
            currentLineNum:0,
            currentShow:0,//显示CD还是歌词，0：CD，1:歌词
            touch:{},
            songReady: false,//判断歌曲是否缓冲完成
            tips:'暂无歌词',//没有歌词的提示
            isLyric:false//是否获得了歌词
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
                    transform:`translate3d(${x}px,${y}px,0) scale(${scale})`
                },
                60:{
                    transform:`translate3d(0,0,0) scale(1.1)`
                },
                100:{
                    transform:`translate3d(0,0,0) scale(1)`
                }
            }
            animations.registerAnimation({
                name:'move',
                animation,
                presets:{
                    duration:400,
                    easing:'linear'
                }
            });
            animations.runAnimation(this.$refs.lyricImg,'move',done);
        },
        afterEnter(el){
            animations.unregisterAnimation('move');
            this.$refs.lyricImg.style.animation = '';
        },
        leave(el,done){
            this.$refs.lyricImg.style.transition = 'all 0.4s'
            const {x, y, scale} = this.getPosAndScale()
            this.$refs.lyricImg.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
            this.$refs.lyricImg.addEventListener('transitionend', done)
            done();
        },
        afterLeave(el){
            this.$refs.lyricImg.style.transition = ''
            this.$refs.lyricImg.style[transform] = ''
        },
        getPosAndScale(){
            const targetWidth = 50;
            const paddingLeft = 40;
            const paddingBottom = 30;
            const paddingTop = 80;
            const width = window.innerWidth*0.8;
            const scale = targetWidth/width;
            const x = -(window.innerWidth/2-paddingLeft);
            const y = window.innerHeight - paddingTop- width/2 - paddingBottom;
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
            // if (!this.songReady) {
            //     return
            // }
            this.setPlaying(!this.playing);
        },
        //上一首播放按钮点击事件
        playLast(){
            // if (!this.songReady) {
            //     return
            // }
             this.isRotate = 'running';
            if (this.playList.length === 1) {
                this.loop()
                return
            } else{
                let index =  this.currentIndex>0 ? this.currentIndex-1:this.playList.length-1;
                this.setCurrentIndex(index);
                if (!this.playing) {
                    this.togglePlaying()
                }
            }
            // this.songReady = false;
        },
        //下一首播放按钮点击事件
        playNext(){
            // if (!this.songReady) {
            //     return
            // }
            this.isRotate = 'running';
            if (this.playList.length === 1) {
                this.loop()
                return
            } else{
                let index = this.currentIndex>=(this.playList.length-1)? 0 : (this.currentIndex+1);
                this.setCurrentIndex(index);
                if (!this.playing) {
                    this.togglePlaying()
                }
            } 
            // this.songReady = false;
        },
        loop() {
            this.$refs.audio.currentTime = 0
            this.$refs.audio.play()
            this.setPlaying(true)
            if (this.currentLyric && this.isLyric) {
            this.currentLyric.seek(0)
            }
        },
        ready(){
            // this.songReady = true;
            this.savePlayHisList(this.currentSong)
        },
        error(){
            // this.songReady = false;
            this.isRotate = 'paused';
            console.log("请求歌曲资源被拒绝")
        },
        /* 歌曲资源为空时 */
        emptied(){
            console.log("此歌曲无法播放");
        },
        playEnd(){
            if (this.mode === playMode.loop) {
                this.loop()
            } else {
                this.playNext()
            }
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
        isFavorite(song) {
            const index = this.favoriteList.findIndex((item) => {
                return item.songid === song.songid
            })
            return index > -1
        },
        toggleFavoriteSong(song){
            if (this.isFavorite(song)){
                this.deleteFavoriteList(song);
            }else{
                this.saveFavoriteList(song);
            }
        },
        getFavoriteIcon(song){
            if (this.isFavorite(song)) {
                return 'like-icon'
            }else{
                return 'nolike-icon'
            }
        },
        //选择播放模式
        selectMode(){
            const mode = (this.mode + 1) % 3;
            this.setMode(mode);
            let list = [];
            if (mode === playMode.random){
                list = shuffle(this.sequenceList);
            }else if(mode === playMode.loop){
                list.push(this.currentSong);
            }else{
                list = this.sequenceList
            }
            this.resetCurrentIndex(list);
            this.setPlaylist(list);
        },
        resetCurrentIndex(list) {
            let index = list.findIndex((item) => {
                return item.songid === this.currentSong.songid
            })
            this.setCurrentIndex(index)
        },
        // 获得对应的歌词
        getLyric(){
            this.currentSong.getLyric().then(res=>{
                this.isLyric = true;
                console.log("异步成功");
                this.currentLyric = new Lyric(res,this.lyricHandler);
                if(this.playing){
                    this.currentLyric.play();
                }
            })
        },
        lyricHandler({lineNum,txt}){
            this.currentLineNum = lineNum;
            if (lineNum>5) {
                let lineEl =  this.$refs.lyricLines[lineNum-5];
                this.$refs.lyricList.scrollToElement(lineEl,1000);
            }else{
                this.$refs.lyricList.scrollTo(0,0,1000);
            }
        },
        //歌词页面和播放页面左右滑动
        movetouchstart(e){
            this.touch.initiated = true;
             // 用来判断是否是一次移动
            this.touch.moved = false
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
            if (!this.touch.moved) {
                this.touch.moved = true
            }
            const left = this.currentShow === 0 ? 0 : -window.innerWidth;
            const offsetWidth =Math.min(0,Math.max(-window.innerWidth,left+deltaX));
            this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
            this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
            this.$refs.lyricList.$el.style[transitionDuration] = 0;
            this.$refs.middleL.style.opacity = 1 - this.touch.percent
            this.$refs.middleL.style[transitionDuration] = 0
        },
        movetouchend(e){
            if (!this.touch.moved) {
                return
            }
            let offsetWidth
            let opacity
            if (this.currentShow === 0) {
            if (this.touch.percent > 0.1) {
                offsetWidth = -window.innerWidth
                opacity = 0
                this.currentShow = '1'
            } else {
                offsetWidth = 0
                opacity = 1
            }
            } else {
            if (this.touch.percent < 0.9) {
                offsetWidth = 0
                this.currentShow = 0
                opacity = 1
            } else {
                offsetWidth = -window.innerWidth
                opacity = 0
            }
        }
        const time = 300
        this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
        this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`
        this.$refs.middleL.style.opacity = opacity
        this.$refs.middleL.style[transitionDuration] = `${time}ms`
        this.touch.initiated = false
        },
        percentChange(percent){
            let currentTime = this.totalTime*percent;
            this.$refs.audio.currentTime = currentTime;
            if (!this.playing) {
                this.togglePlaying()
            };
            if (this.currentLyric && this.isLyric) {
                this.currentLyric.seek(currentTime * 1000)
            }
        },
        ...mapMutations({
            SetFullScreen: 'SET_FULL_SCREEN',
            setPlaying:'SET_PLAYING',
            setCurrentIndex:'SET_CURRENT_INDEX',
            setLikeState:'SET_LIKE_STATE',
            setMode:'SET_MODE',
            setPlaylist:'SET_PLAY_LIST'
        }),
        ...mapActions([
            'saveFavoriteList',
            'deleteFavoriteList',
            'savePlayHisList'
        ])
    },
    computed:{
        ...mapGetters([
            'fullScreen',
            'playList',
            'favoriteList',
            'currentSong',
            'playing',
            'currentIndex',
            'mode',
            'sequenceList'
        ])
    },
    watch:{
        currentSong(newSong,oldSong){
            if (!newSong.songid) {
                return
            }
            if (newSong.songid === oldSong.songid) {
             return
            }
            if (this.currentLyric && this.isLyric) {
                this.currentLyric.stop();
            }
            clearTimeout(this.timer)
            this.timer = setTimeout(() => {
                this.$refs.audio.play()
                this.getLyric()//获得对应歌词
            }, 1000)
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
                //歌词停止还是播放
                if (this.currentLyric && this.isLyric) {
                    this.currentLyric.togglePlay();
                }
                //监听播放还是停止，来控制专辑封面是否旋转
                this.isRotate = newPlaying?'running':'paused';
            })
        },
        mode(mode){
            if (mode === 0) {
                return this.playModeClass = 'order-icon';
            }else if(mode === 1){
                return this.playModeClass = 'loop-icon';
            }else if(mode === 2){
                return this.playModeClass = 'random-icon';
            }
        },
        fullScreen(newVal) {
            if (newVal) {
                setTimeout(() => {
                    this.$refs.lyricList.refresh()
                }, 20)
                // this.isRotate = this.playing?'running':'paused';
            }
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