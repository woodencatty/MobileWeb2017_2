var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { });
});

router.get('/dashboard', function(req, res, next) {
  res.render('dashboard', {  });
});

router.get('/devicelist', function(req, res, next) {
  res.render('devicelist', {  });
});

module.exports = router;
