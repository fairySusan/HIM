import {saveSearch,clearHistory} from 'common/js/cache'
import * as types from './mutation-types'
export const saveSearchHistory = function ({commit},query){
    commit(types.SET_SEARCH_HISTORY,saveSearch(query))//参数解构
}
export const clearSearchHistory = function({commit},flag){
    commit(types.SET_SEARCH_HISTORY,clearHistory(flag));
}

export const selectPlay = function({commit,state},{list,index}){
    commit(types.SET_SEQUENCE_LIST,list);
    commit(types.SET_PLAY_LIST,list);
    commit(types.SET_CURRENT_INDEX,index);
    commit(types.SET_PLAYING,true);
    commit(types.SET_FULL_SCREEN,true);
}