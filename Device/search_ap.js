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
            sendData.SubmitDeviceName('LED001', 'v1.0', 'LED', "256색LED");            
          });
    }
}
