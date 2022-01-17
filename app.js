'use strict';
const express = require('express');
const exphbs = require('express-handlebars')
const http = require("http");
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');

const fileurl = "./prizeList1.txt";

/**
 * 設定 template engine
 */
//app.engine('handlebars', exphbs('defaultLayout: main'))
app.engine('handlebars', require('exphbs'));
app.set('view engine', 'handlebars')
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
/**
 * 首頁
 */
app.get("/", function (req, res, next) {
  var obj = getPrizeFile();
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.json({ 'arr': obj });
});

app.post("/write", function (req, res, next) {
  var data = "";

  for (var i = 0; i < req.body.length; i++) {
    if (data == "") {
      data = req.body[i].prize + "|" + req.body[i].count;
    } else {
      data += "," + req.body[i].prize + "|" + req.body[i].count;
    }

  }

  fs.writeFile(fileurl, data, function (err) {
    if (err)
      console.log(err);
    else
      console.log('Write operation complete.');
  });
  res.json(data)
});

app.post("/append", function (req, res, next) {
  var data = "," + req.body.insert;
  fs.appendFile(fileurl, data, function (err) {
    if (err)
      console.log(err);
    else
      console.log('Saved!');
  });
  res.render('setting');
});
/**
 * 抽獎頁面
 */
app.get('/index', function (req, res, next) {

  switch (req.query.id) {
    case '1':
      fileurl = "./prizeList1.txt";
      break;
    case '2':
      fileurl = "./prizeList2.txt";
      break;
    case '3':
      fileurl = "./prizeList3.txt";
      break;
    case '4':
      fileurl = "./prizeList4.txt";
      break;
    default:
      fileurl = "./prizeList1.txt";
  }
  console.log("fileurl",fileurl);
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
  var list = fs.readFileSync(fileurl, 'utf8');
  var arrlist = list.split(',');

  return arrlist;
}
