//操作localStorage缓存的逻辑
import storage from 'good-storage'

const SEARCH_KEY = 'search'
const SEARCH_MAX_LENGTH = 15//数组最多可以放入15条数据

 /* 先查找历史数组中有没有这个元素，有的话就把它提到第一个，没有的话就从头部插入进去，
 若数组长度满，就删掉最后一个 */

function insertArray(arr,val,compare,maxLen){
    const index = arr.findIndex(compare);//findIndex是es6的函数，查找数组中是否有这个元素
    if(index === 0){
        return 
    }
    if(index>0){
        arr.splice(index,1)
    }
    arr.unshift(val)
    if(maxLen && arr.length>maxLen){
        arr.pop();
    }
}
function deleteFromArray(arr, compare) {
    const index = arr.findIndex(compare)
    if (index > -1) {
      arr.splice(index, 1)
    }
    return arr;
}
export function saveSearch(query){
    let searches = storage.get(SEARCH_KEY,[]);
    insertArray(searches,query,(item)=>{
        return item.songname === query.songname
    },SEARCH_MAX_LENGTH)
    storage.set(SEARCH_KEY,searches);
    return searches;
}
export function clearHistory(flag){
    //flag为1清除全部记录，其他清除单个记录
    if (flag === 1) {
        storage.remove(SEARCH_KEY);
        return [];
    }else{
        let searches = storage.get(SEARCH_KEY, [])
        deleteFromArray(searches, (item) => {
          return item.songname === flag.songname
        })
        storage.set(SEARCH_KEY, searches);
        return searches;
    }
}
//从本地缓存区读
export function loadSearch(){
    return storage.get(SEARCH_KEY,[]);
}
