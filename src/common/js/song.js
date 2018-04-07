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
export function createSong(musicItem){
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