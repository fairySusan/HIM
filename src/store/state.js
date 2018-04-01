import {loadSearch,loadFavorite} from 'common/js/cache'
import {playMode} from 'common/js/config'
const state = {
    singer:{},
    searchHistory:loadSearch(),//搜索历史
    topList:{},
    // 以下都是全局变量
    playing:false,//播放和暂停的状态
    fullScreen:false,//全屏和迷你的状态
    playList:[],//播放列表
    sequenceList:[],//顺序列表
    mode:playMode.sequence,//播放模式默认为顺序播放
    currentIndex:-1,//当前播放歌曲的索引
    favoriteList:loadFavorite,//
    playHisList:[]//历史播放列表
}
export default state