import jsonp from '../common/js/jsonp'
import {commonParams,options} from './config'
export function getSingerList(){
    const url = 'https://shc.y.qq.com/v8/fcg-bin/v8.fcg';
    const data = Object.assign({},commonParams,{
        channel:'singer',
        page:'list',
        pagesize:100,
        key:'all_all_all',
        pagenum:1,
        g_tk:545316097,
        platform:'yqq',
        uin:0,
        hostUin:0,
        needNewCode:0
    })
    return jsonp(url,data,options);
}