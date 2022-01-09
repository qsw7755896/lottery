'use strict';
const express = require('express');
const exphbs = require('express-handlebars')
const http = require("http");
//const https = require("https")
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
//const request = require("request");

const list = [{ id: 1, name: "小明" }];

/**
 * 設定 template engine
 */
//app.engine('handlebars', exphbs('defaultLayout: main'))
app.engine('handlebars', require('exphbs'));
app.set('view engine', 'handlebars')


/**
 * 首頁
 */
app.get("/", function (req, res, next) {
  var obj = getPrizeFile();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ 'arr': obj });
});

app.post("/write", function (req, res, next) {
  console.log(req.body)
  res.json(req.body)
});
/**
 * 抽獎頁面
 */
app.get('/index', function (req, res, next) {
  res.render('index');

});
/**
 * 設置獎品頁面
 */
app.get('/setting', function (req, res, next) {
  res.render('setting');

});
/**
 * create server
 */
var server = http.createServer(app)
server.listen(port, () => {
  console.log(`server listen to http://localhost:${port}`)
})

function getPrizeFile() {
  var list = fs.readFileSync('./prizeList.txt', 'utf8');
  var arrlist = list.split(',');

  return arrlist;
}
