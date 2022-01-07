'use strict';

const express = require('express');
const http = require("http");
//const https = require("https")
const app = express();
const fs = require('fs');
const port = 3000;
//const request = require("request");

const list = [{ id: 1, name: "小明" }];

//首頁
app.get("/", function (req, res, next) {
	var obj = getPrizeFile();
	res.setHeader("Access-Control-Allow-Origin","*");
	res.json({'arr':obj});
});
//首頁
app.get('/index', function (req, res, next) {
	

  res.render('index');
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
