import jsonp from '../common/js/jsonp'
import axios from 'axios'
export function getLyric(songmid){
    const url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg';
    const data = Object.assign({},commonParams,{
        platform:'yqq',
        uin:0,
        hostUin:0,
        needNewCode:0,
        songmid:'',
        pcachetime:+new Date(),
        format:'json',
        songmid:songmid
    })
    return axios.get(url,{
        params:data
    }).then(res=>{
        return Promise.resolve(res.data);
    })
}