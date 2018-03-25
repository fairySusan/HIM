export default class Song{
  constructor({songid,albummid,singer,songname,albumname,duration,img,url}){
    this.songid = songid;
    this.albummid = albummid;
    this.singer = singer;
    this.songname = songname;
    this.albumname = albumname;
    this.duration = duration;
    this.img = img;
    this.url = url;

  }
}
export function createSong(musicDataItem){
  return new Song({
    songid:musicDataItem.songid,//歌曲id
    albummid:musicDataItem.albummid,//专辑id
    singer: filterSinger(musicDataItem.singer),//演唱者
    songname: musicDataItem.songname,//歌曲名
    albumname: musicDataItem.albumname,//专辑名
    duration: musicDataItem.interval,//歌曲时长
    img: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicDataItem.albummid}.jpg?max_age=2592000`,
    url: `http://ws.stream.qqmusic.qq.com/${musicDataItem.songid}.m4a?fromtag=46`
  })
}
//一首歌有多个演唱者，连接演唱者的字符串
export function filterSinger(singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    singer.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
  }