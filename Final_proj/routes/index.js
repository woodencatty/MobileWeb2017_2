var express = require('express');
var router = express.Router();
const mysql = require('mysql');


const client = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'localuser',
  password: '1111',
  database: 'web'
});

/* GET home page. */
router.get('/', function(req, res, next) { //로그인
  res.render('login', { });
});

router.get('/join', function(req, res, next) { //회원가입
  res.render('join', { });
});


module.exports = router;
