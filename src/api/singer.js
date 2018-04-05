// 得到歌手页面数据的api
import jsonp from '../common/js/jsonp'
import {commonParams,options} from './config'
import axios from 'axios'
export function getSingerList(){
    const url = 'https://shc.y.qq.com/v8/fcg-bin/v8.fcg';
    const data = Object.assign({},commonParams,{
        channel:'singer',
        page:'list',
        pagesize:100,
        key:'all_all_all',
        pagenum:1,
        platform:'yqq',
        uin:0,
        hostUin:0,
        needNewCode:0
    })
    return jsonp(url,data,options);
}
export function getSingerDetail(singermid){
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
    const data = Object.assign({},commonParams,{
        hostUin:0,
        needNewCode:0,
        platform:'yqq',
        order:'listen',
        begin:0,
        num:100,
        songstatus:1,
        singermid:singermid
    })
    return jsonp(url,data,options);
}
export function getVKey(){
    const url = 'http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg'
    const data = Object.assign({},commonParams,{
        json:3,
        guid:3037970042
    })
    return jsonp(url,data,options);
}