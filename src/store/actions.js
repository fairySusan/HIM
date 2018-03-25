import {saveSearch,clearHistory} from 'common/js/cache'
import * as types from './mutation-types'
export const saveSearchHistory = function ({commit},query){
    commit(types.SET_SEARCH_HISTORY,saveSearch(query))
}

export const clearSearchHistory = function({commit},flag){
    commit(types.SET_SEARCH_HISTORY,clearHistory(flag));
}