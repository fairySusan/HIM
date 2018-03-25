import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state,singer) {
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
    }

}
 export default mutations