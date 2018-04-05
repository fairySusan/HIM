var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");


var recommend;//推荐页面数据

// 异步读取
fs.readFile('test2.json', function (err, data) {
  if (err) {
      return console.error(err);
  }
  console.log("异步读取: " + data.toString());
  recommend =  data.toString();
});

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));

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

app.get('/getRecommend',function(req,res){
  res.send(recommend);
})
app.get('/getHotRecommend',function(req,res){
  res.send('得到热门推荐');
})
 var server = app.listen(8081, function () {
 
    var host = server.address().address
    var port = server.address().port
    
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
   
  })