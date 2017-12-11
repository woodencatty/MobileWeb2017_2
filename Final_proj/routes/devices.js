var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/dashboard', function(req, res, next) { //메인화면
  res.render('dashboard', {  });
});

router.get('/device', function(req, res, next) {//기기 목록
  res.render('device', {  });
});


module.exports = router;
