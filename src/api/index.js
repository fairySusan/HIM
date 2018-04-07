import axios from 'axios';
const baseurl = '/'
/* 得到幻灯片图片api */
export const getRecommend = () => axios.get(baseurl+'getRecommend?time='+new Date().getTime());
/* 得到今日推荐api */
export const getHotRecommend = () => axios.get(baseurl+'getHotRecommend?time='+new Date().getTime());
/* 得到歌手列表api */
export const getSingerList = () => axios.get(baseurl+'getSingerList?time='+new Date().getTime());
/* 得到歌手的详情页数据 */
export const getSingerDetail = (id) => axios.get(baseurl+'getSingerDetail?id='+id+'&time='+new Date().getTime());
/* 得到播放歌曲的歌词数据 */
export const getLyric = (id) => axios.get(baseurl+'getLyric?id='+id+'&time='+new Date().getTime());
