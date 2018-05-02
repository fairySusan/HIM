var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");
var axios = require('axios')

var apiRoutes = express.Router()

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.use('/api', apiRoutes)

var recommend;//推荐页面数据
var newsongList;//新歌数据
var singerList;//歌手数据
var singerdetailList;//歌手详情页数据
var lyric;//歌词数据

// 异步读取
fs.readFile('index/recommand.json', function (err, data) {
  if (err) {
      return console.error(err);
  }
  recommend =  data;
});
fs.readFile('index/newsong.json', function (err, data) {
  if (err) {
      return console.error(err);
  }
  newsongList =  data;
});
fs.readFile('singer/singer.json', function (err, data) {
  if (err) {
      return console.error(err);
  }
  singerList =  data;
});
fs.readFile('singer/singerdetail.json', function (err, data) {
  if (err) {
      return console.error(err);
  }
  singerdetailList =  JSON.parse(data);
});
fs.readFile('lyric/lyric.json', function (err, data) {
  if (err) {
      return console.error(err);
  }
  lyric =  JSON.parse(data);
});

// 跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

/* -------------接口----------------- */
// app.get('/getRecommend',function(req,res){
//   res.send(recommend);
// })
// app.get('/getHotRecommend',function(req,res){
//   res.send(newsongList);
// })
// app.get('/getSingerList',function(req,res){
//   res.send(singerList);
// })
// app.get('/getSingerDetail',function(req,res){
//   singerdetailList.data.forEach(element => {
//     if (req.query.id == element.singerid) {
//       res.send(element);
//     }
//   });
// })
// app.get('/getLyric',function(req,res){
//   let flag = 0;
//   let tips = {
//     "code":1,
//     "songname":"",
//     "songid":"",
//     "lyric":"暂无歌词"
//   }
//   lyric.data.forEach(element => {
//     if (req.query.id == element.songid) {
//       res.send(element);
//       flag = 1;
//       return;
//     }
//   });
//   if (flag == 0) {
//     res.send(tips);
//   }
// })
apiRoutes.get('/getHotRecommend', function (req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    res.json(response.data)
  }).catch((e) => {
    console.log(e)
  })
})
apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^\(\)]+})\)$/
      var matches = response.data.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

 var server = app.listen(8081, function () {
 
    var host = server.address().address
    var port = server.address().port
    
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  })