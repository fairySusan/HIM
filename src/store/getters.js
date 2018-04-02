export const singer = state => state.singer

export const searchHistory = state => state.searchHistory

export const topList = state => state.topList

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playList = state => state.playList

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) =>{
    return state.playList[state.currentIndex] || {};
}
export const favoriteList = state => state.favoriteList

export const playHisList = state => state.playHisList

export const isLike = state => state.isLike