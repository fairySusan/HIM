import originJSONP from 'jsonp'
// data为url后面接的参数
export default function jsonp(url,data,option){
    url += (url.indexOf('?')<0 ? '?':'&') + param(data);//给第一个参数前加问号
    return new Promise((resolve,reject) => {
        originJSONP(url,option,(err,data) => {
            if (!err) { //成功
                resolve(data);
            }else{   //出错
                reject(err);
            }
        })
    });
}

function param(data){
    let url =''
    for(var k in data){
        let value = data[k] !== undefined ? data[k] : "";
        // url+='&${k}=$'+encodeURIComponent(value);
        url+='&'+k+'='+encodeURIComponent(value);
    }
    return url ? url.substring(1) : '';//删掉第一个&
}