'use strict';

const express = require('express');
const http = require("http");
//const https = require("https")
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
//const request = require("request");

const list = [{ id: 1, name: "小明" }];
// 設置請求路徑為 /products 請求方法為 get
//app.get("/", function (req, res, next) {
//  var obj = getPrizeFile();
//  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1')
//  res.send({ success: true, obj }).end();
//});
//首頁
app.get("/", function (req, res, next) {
  return promise
    .then((obj) => {
      res.redirect("/index");
    })
    .catch((err) => {
      res.redirect("/auth");
    })
});
//首頁
app.get('/index', function (req, res, next) {
	
	var obj = getPrizeFile();
	res.json({'arr':obj});
  //res.render('index');
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
