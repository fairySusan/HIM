import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state,singer) {//ES6计算属性命名功能，使用一个常量作为函数名
        state.singer = singer
    },
    [types.SET_SEARCH_HISTORY](state,history){
        state.searchHistory = history
    },
    [types.SET_TOP_LIST](state, topList) {
        state.topList = topList
    },
    [types.SET_PLAYING](state,flag) {
        state.playing = flag
    },
    [types.SET_FULL_SCREEN](state,flag) {
        state.fullScreen = flag
    },
    [types.SET_PLAY_LIST](state,playList) {
        state.playList = playList
    },
    [types.SET_SEQUENCE_LIST](state,sequenceList) {
        state.sequenceList = sequenceList
    },
    [types.SET_MODE](state,mode) {
        state.mode = mode
    },
    [types.SET_CURRENT_INDEX](state,currentIndex) {
        state.currentIndex = currentIndex
    },
    [types.SET_FAVORITE_LIST](state,list) {
        state.favoriteList = list
    },
    [types.SET_PLAY_HIS_LIST](state,list){
        state.playHisList = list
    },
    [types.SET_LIKE_STATE](state,flag){
        state.isLike = flag
    }

}
 export default mutations