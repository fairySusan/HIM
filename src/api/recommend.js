import jsonp from '../common/js/jsonp'
import {commonPramas,options} from './config'
export  function getRecommend(){
    const url = 'https://u.y.qq.com/cgi-bin/musicu.fcg';
    const data = Object.assign({},commonPramas,{
        platform:'h5',
        uin:0,
        needNewCode:1
    })
    return jsonp(url,data,options);
}