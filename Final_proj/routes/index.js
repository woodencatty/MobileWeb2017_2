const express = require('express');
const router = express.Router();
const fs = require('fs');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const http = require('http');
const service = require('./service.js');

var key = 'secret'; //암호화 키
var logincheck = false; //로그인이 되어있는지 체크 아니라면 첫 페이지로 이동
var logoutcheck = false; //로그아웃되었을때 알림
var dbcheck = false; //db오류가 났을때 알림
var deletecheck = false; //
var errcheck = false; //에러가 났을때 알림
var loginerrcheck = false; //로그인시 잘못된 정보를 입력했을때 알림
var passcheck = false; // 비밀번호 확인문자가 다를시 알림
var countcheck = false; // 입력문제가 db제한을 초과하였을때 알림
var createcheck = false; //회원가입 알림


const client = mysql.createConnection({ //디비 연결
    host: 'localhost',
    port: 3306,
    user: 'localuser',
    password: '1111',
    database: 'web'
});

//로그인 및 회원가입
router.get('/', function (req, res, next) { //로그인
    var check = false;
    var echeck = false;
    var errlongin = false;
    var ccheck = false;
    if (logincheck) { //잘못된 접근일때 첫페이지로 오면 알람뜨게 설정
        check = true;
        logincheck = false;
    }
    if (logoutcheck) { //로그아웃하면 첫페이지로 이동되면서 알름뜨게 설정 
        echeck = true;
        logoutcheck = false;
    }
    if (loginerrcheck) { //아이디 혹은 비밀번호를 잘못입력했을때 알람
        errlongin = true;
        loginerrcheck = false;
    }
    if (createcheck) { //아이디 혹은 비밀번호를 잘못입력했을때 알람
        ccheck = true;
        createcheck = false;
    }
    res.render('login', {
        logincheck: check,
        logoutcheck: echeck,
        createcheck: ccheck,
        loginerrcheck: errlongin
    });
});
router.post('/', function (req, res) { //로그인
    var body = req.body;
    //입력한 아이디가 DB에 있는지 체크
    client.query('SELECT * FROM User WHERE id = ?', [body.id], (err, rows) => {
        if (!rows.length) { //일치정보가 없으면
            loginerrcheck = true;
            res.redirect('/');;
        } else { //일치정보가 있으면
            var enc = crypto.createCipher('aes192', key);
            var encpass = enc.update(body.password, 'utf8', 'base64');
            encpass += enc.final('base64');
            if (encpass == rows[0].password) {
                req.session.user_id = rows[0].id; //로그인 유지 세션
                res.redirect('/dashboard');
            } else { //비밀번호를 잘못입력
                loginerrcheck = true;
                res.redirect('/');;
            }
        }
    });
});

router.get('/logout', (req, res, next) => {//로그아웃
    req.session.destroy(function () {
        req.session;
    });
    logoutcheck = true;
    res.redirect('/');
});

//회원가입
router.get('/join', function (req, res, next) { //회원가입
    var check = false;
    if (dbcheck) { //중요정보를 입력하였는지 체크
        check = true;
        dbcheck = false;
    }
    var pcheck = false;
    if (passcheck) { //비밀번호확인문자가 다르면 체크
        pcheck = true;
        passcheck = false;
    }
    var lcheck = false;
    if (logincheck) { //아이디 중복체크
        lcheck = true;
        logincheck = false;
    }
    var ocheck = false;
    if (countcheck) { //글자수 체크
        ocheck = true;
        countcheck = false;
    }
    req.session.now = (new Date()).toUTCString(); //세션 시간 갱신
    res.render('join', {
        dbcheck: check,
        passcheck: pcheck,
        countcheck: ocheck,
        logincheck: lcheck
    });
});
router.post('/join', function (req, res) { //회원가입
    var body = req.body;
    console.log(body);
    if (body.password != body.passwordcheck) { //비밀번호 확인문자 체크
        passcheck = true;
        res.redirect('/join');
    } else if (body.id != '' && body.password != '' && body.passwordcheck != '' && body.nickname != '') { //입력정보 체크
        client.query('SELECT id FROM User WHERE id=?', [body.id], (err, rows) => {
            if (!rows.length) { //id중복체크
                var enc = crypto.createCipher('aes192', key);
                var encpass = enc.update(body.password, 'utf8', 'base64');
                encpass += enc.final('base64');
                client.query('INSERT INTO User(id,password,nickname) VALUES (?,?,?)', [body.id, encpass, body.nickname], (err, rows) => {
                    if (err) { //에러(글자수) 체크
                        countcheck = true;
                        res.redirect('/join');
                    } else { //정상작동
                        createcheck = true;
                        res.redirect('/');
                    }
                });
            } else { //
                logincheck = true;
                res.redirect('/join');
            }
        });
    } else {
        dbcheck = true;
        res.redirect('/join');
    }
});


//디바이스 관리
router.get('/device', function (req, res, next) { //메인화면
    client.query('SELECT * FROM User WHERE id = ?', [req.session.user_id], (err, rows) => { //입력한 아이디가 DB에 있는지 체크
        if (!rows.length) { //일치하는 id가 없다면
            logincheck = true;
            res.redirect('/');
        } else { //일치하는 id가 있다면
            client.query('SELECT * FROM SearchedDevice', (err, sch_device_rows) => {
                client.query('SELECT * FROM Device WHERE owner=?', [req.session.user_id], (err, reg_device_rows) => {
                    req.session.now = (new Date()).toUTCString();
                    res.render('device', {
                        sch_device_data: sch_device_rows,
                        reg_device_data: reg_device_rows,
                        username: rows[0].nickname,
                        userid: rows[0].id
                    });
                });
            });
        }
    });
});

router.post('/device', function (req, res, next) { //계정 목록
    var body = req.body;
    if (body.type == 'delete') {
        client.query('DELETE FROM Device WHERE deviceid = ?', [body.deviceid], (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/device');
        });
    }else if (body.type == 'register') {
        client.query('INSERT INTO Device(deviceid,version,sort,activated,ipv4,`describe`,owner) VALUES (?,?,?,?,?,?,?)', [body.deviceid, body.version, body.sort, 0, body.ipv4, body.describe, body.owner], (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/device');
        });
    }
});


//서비스 관리
router.get('/service', function (req, res, next) { //메인화면
    client.query('SELECT * FROM User WHERE id = ?', [req.session.user_id], (err, rows) => { //입력한 아이디가 DB에 있는지 체크
        if (!rows.length) { //일치하는 id가 없다면
            logincheck = true;
            res.redirect('/');
        } else { //일치하는 id가 있다면
            client.query('SELECT * FROM SearchedDevice', (err, sch_device_rows) => {
                client.query('SELECT * FROM Device WHERE owner=?', [req.session.user_id], (err, reg_device_rows) => {
                    req.session.now = (new Date()).toUTCString();
                    res.render('service', {
                        sch_device_data: sch_device_rows,
                        reg_device_data: reg_device_rows,
                        username: rows[0].nickname,
                        userid: rows[0].id
                    });
                });
            });
        }
    });
});

router.post('/service', function (req, res, next) { //계정 목록
    var body = req.body;
    client.query('SELECT * FROM User WHERE id = ?', [req.session.user_id], (err, rows) => { //입력한 아이디가 DB에 있는지 체크
        if (!rows.length) { //일치하는 id가 없다면
            logincheck = true;
            res.redirect('/');
        } else { //일치하는 id가 있다면
    if (body.type == 'detail') {
        client.query('SELECT * FROM Device WHERE deviceid=?', [body.deviceid], (err, dev_rows) => {
        req.session.now = (new Date()).toUTCString();
        res.render('service_detail', {
            data : dev_rows,
            userid: rows[0].id           
        });
    });
    }
}
});
});

//계정관리


router.get('/account', function (req, res, next) { //계정 목록
    client.query('SELECT * FROM User WHERE id = ?', [req.session.user_id], (err, rows) => { //입력한 아이디가 DB에 있는지 체크
        if (!rows.length) { //일치하는 id가 없다면
            logincheck = true;
            res.redirect('/');;
        } else { //일치하는 id가 있다면
            req.session.now = (new Date()).toUTCString();
            client.query('SELECT * FROM User', (err, rows) => {
                if (req.session.admin) {
                    req.session.admin = false;
                    res.render('account', {
                        data: rows,
                        username: rows[0].nickname,
                        admincheck: true
                    });
                } else {
                    req.session.admin = false;
                    res.render('account', {
                        data: rows,
                        username: rows[0].nickname,
                        admincheck: false
                    });
                }
            });
        }
    });
});
router.post('/account', function (req, res, next) { //계정 목록
    var body = req.body;
    if (body.password == '1234') {
        req.session.admin = true;
        res.redirect('/account');;
    }
    if (body.type == 'delete') {
        client.query('DELETE FROM User WHERE id = ?', [body.id], (err, rows) => {
            if (err) {
                console.log(err);
            }
            res.redirect('/account');
        });
    }
});


module.exports = router;
