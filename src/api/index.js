import axios from 'axios';
const baseurl = '/'
export const getRecommend = () => axios.get(baseurl+'getRecommend?time='+new Date().getTime());
export const getHotRecommend = () => axios.get(baseurl+'getHotRecommend?time='+new Date().getTime());
