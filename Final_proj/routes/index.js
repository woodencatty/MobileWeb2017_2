var express = require('express');
var router = express.Router();
var http = require('http');


let serverIP = "";
let serverPort = "";

function Setup_device_Socket(){
  http.createServer((request, response) => {
    if (request.method == 'POST') {
      if (request.url == '/device/information') {
        IDD_ID = request.headers.idd_id;
        response.writeHead(200);
        response.end("gotit");    //IDD에 확인메세지 전송
        console.log("Hi! "+ IDD_ID);   //환자 식별
      }
      if (request.url == '/device/leave') {
        response.writeHead(200);
        response.end("gotit. bye");    //IDD에 확인메세지 전송
      }
      else {
        console.log("error");
        response.writeHead(404);
        response.end();
      }
    } /* GET method */
  }).listen(3010, () => {
    console.log('Socket is Running (3010) ...');
  });
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {  });
});

router.get('/device', function(req, res, next) {
  res.render('device', {  });
});

router.get('/account', function(req, res, next) {
  res.render('devicelist', {  });
});

Setup_device_Socket();    

module.exports = router;
