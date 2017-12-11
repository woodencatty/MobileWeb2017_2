var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) { //로그인
  res.render('login', { });
});

router.get('/join', function(req, res, next) { //회원가입
  res.render('join', { });
});


module.exports = router;
