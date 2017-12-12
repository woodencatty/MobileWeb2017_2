const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import
var piWifi = require('pi-wifi');

var searched = false;

const fs = require('fs');

module.exports = {
    searchDevice: () => {
        piWifi.check('APD', function(err, result) {
            if (err) {
              return console.error(err.message);
            }
            console.log(result);
          });
    }
}


/*
var piwifi = require('pi-wifi');

piwifi.connect('APD', '1q2w3e4r', (err)=>{
    //TODO : 연결
});
*/

