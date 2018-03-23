import {saveSearch} from 'common/js/cache'
import * as types from './mutation-types'
export const saveSearchHistory = function ({commit},query){
    commit(types.SET_SEARCH_HISTORY,saveSearch(query))
    console.log('替换',query);
}