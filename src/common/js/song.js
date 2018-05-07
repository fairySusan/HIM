import { getLyric } from 'api/lyric'
import { Base64 } from 'js-base64'
import { ERR_OK } from 'api/config'
export default class Song{
  constructor({songid,songmid,albummid,singer,songname,albumname,duration,img,url}){
    this.songid = songid;
    this.songmid = songmid;
    this.albummid = albummid;
    this.singer = singer;
    this.songname = songname;
    this.albumname = albumname;
    this.duration = duration;
    this.img = img;
    this.url = url;
  }
  // Promise 封装
  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      getLyric(this.songmid).then(res => {
        if (res.retcode === ERR_OK) {
          this.lyric = Base64.decode(res.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }
} 
export function createNewSong(musicItem){
  return new Song({
    songid:musicItem.songid,//歌曲id
    albummid:musicItem.albummid,//专辑id
    singer: filterSinger(musicItem.singer),//演唱者
    songname: musicItem.songname,//歌曲名
    albumname: musicItem.albumname,//专辑名
    duration: musicItem.interval,//歌曲时长
    img: `http://127.0.0.1:8081/${musicItem.picid}`,
    url:`http://127.0.0.1:8081/songs/${musicItem.songid}.mp3`
  })
}
export function createSong(musicItem){
  return new Song({
    songid:musicItem.songid,//歌曲id
    songmid:musicItem.songmid,
    albummid:musicItem.albummid,//专辑id
    singer: filterSinger(musicItem.singer),//演唱者
    songname: musicItem.songname,//歌曲名
    albumname: musicItem.albumname,//专辑名
    duration: musicItem.interval,//歌曲时长
    img: `http://y.gtimg.cn/music/photo_new/T002R300x300M000${musicItem.albummid}.jpg?max_age=2592000`,
    url:`http://thirdparty.gtimg.com/C100${musicItem.songmid}.m4a?fromtag=38`,
    // url:`http://cc.stream.qqmusic.qq.com/C100${musicItem.songmid}.m4a?fromtag=52`
  })
}
//一首歌有多个演唱者，连接演唱者的字符串
export function filterSinger(singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    if(singer instanceof Array){
      singer.forEach((s) => {
      ret.push(s.name)
      })
      return ret.join('/')
    }else{
      return
    }
  }