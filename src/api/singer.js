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
    const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
    const data = Object.assign({},commonParams,{
        hostUin:0,
        uin:0,
        guid:3037970042,
        platform:'yqq',
        cid: 205361747,
        loginUin: 0,
        format:'json',
        songmid: '000C0joK1H4ZMY',
        filename: 'C4000027VNOV2JQRYA.m4a',
        callback:'jsonpCallback'        

    })
    const options={
        param:'jsonpCallback',
    }
    return jsonp(url,data,options);
}