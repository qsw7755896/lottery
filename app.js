'use strict';

const express = require('express');
const http = require("http");
//const https = require("https")
const app = express();
const fs = require('fs');

//const request = require("request");

const list = [{ id: 1, name: "小明" }];
// 設置請求路徑為 /products 請求方法為 get
app.get("/", function (req, res, next) {
  var obj = getPrizeFile();
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1')
  res.send({ success: true, obj }).end();
});

var server = app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


function getPrizeFile() {
  var list = fs.readFileSync('./prizeList.txt', 'utf8');
  var arrlist = list.split(',');

  return arrlist;
}
