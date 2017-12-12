const scanAP = require('./search_ap.js')   
const fs = require('fs');
var piwifi = require('pi-wifi');

function scanInterval(apName, connectRange, leaveRange, password, scanInterval) {
    this.scanInterval = setInterval(() => {
      scanAP.searchDevice();
    }, scanInterval);
  }

function initialize() {

  
  piwifi.connect('APD', '1q2w3e4r', (err)=>{
      //TODO : 연결
      console.log(err);
  });

  fs.readFile('./settings.conf', 'utf8',(err, data)=> {  
    var config = JSON.parse(data);    
    scanInterval(config.apName, config.connectRange, config.leaveRange, config.password, config.scanInterval);
  });
  
}

initialize();
