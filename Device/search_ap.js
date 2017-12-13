const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import
var piWifi = require('pi-wifi');

var searched = false;

const fs = require('fs');

module.exports = {
    searchServer: () => {
        piWifi.check('APD', function(err, result) {
            if (err) {
              return console.error(err.message);
            } 
            fs.readFile('./profile.json', 'utf8',(err, data)=> {  
                var profile = JSON.parse(data);    
                sendData.SubmitDeviceName(profile.deviceName, profile.version, profile.sort, profile.describe, profile.func);
              });            
          });
    }
}
