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

/*
const client = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1q2w3e4r',
  database: 'web'
});
*/

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/account', function(req, res, next) {//계정 목록
  res.render('account', {  });
});

module.exports = router;
