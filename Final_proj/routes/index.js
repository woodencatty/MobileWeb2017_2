var express = require('express');
var router = express.Router();
var http = require('http');


function Setup_device_Socket(){
  http.createServer((request, response) => {
    if (request.method == 'POST') {
      if (request.url == '/device/information') {
        Device_ID = request.headers.device_id;
        response.writeHead(200);
        response.end("gotit");    //기기 확인메세지 전송
        console.log("Hi! "+ Device_ID);   //기기 식별
      }
      if (request.url == '/device/leave') {
        response.writeHead(200);
        response.end("gotit. bye");    //기기 확인메세지 전송
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
router.get('/', function(req, res, next) { //로그인
  res.render('login', { });
});

router.get('/', function(req, res, next) { //회원가입
  res.render('join', { });
});


router.get('/account', function(req, res, next) {//계정 목록
  res.render('account', {  });
});

router.get('/dashboard', function(req, res, next) { //메인화면
  res.render('dashboard', {  });
});

router.get('/device', function(req, res, next) {//기기 목록
  res.render('device', {  });
});

Setup_device_Socket();    

module.exports = router;
