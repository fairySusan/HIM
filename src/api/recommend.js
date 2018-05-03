import jsonp from '../common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'
export  function getRecommend(){
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
    const data = Object.assign({},commonParams,{
        platform:'h5',
        uin:0,
        needNewCode:1
    })
    return jsonp(url,data,options);
}
export function getHotRecommend(){
    const url = '/getHotRecommend';
    const data = Object.assign({},commonParams,{
        platform:'yqq',
        uin:0,
        needNewCode:1,
        hostUin: 0,
        rnd:Math.random(),
        categoryId:10000000,
        sin:0,
        sortId:5,
        format:'json'
    })
    return axios.get(url,{
        params:data
    }).then(res=>{
        return Promise.resolve(res.data)
    });
}