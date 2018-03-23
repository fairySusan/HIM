import * as types from './mutation-types'

const mutations = {
    [types.SET_SINGER](state,singer) {
        state.singer = singer
    },
    [types.SET_SEARCH_HISTORY](state,history){
        state.searchHistory = history
    }
}
 export default mutations