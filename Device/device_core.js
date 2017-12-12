const scanAP = require('./search_ap.js')   //포스터기기 탐색 모듈 import
const fs = require('fs');

function scanInterval(apName, connectRange, leaveRange, password, scanInterval) {
    this.scanInterval = setInterval(() => {
      scanAP.searchAPD(apName, password, connectRange, leaveRange);
    }, scanInterval);
  }

function initialize() {
  fs.readFile('./settings.conf', 'utf8',(err, data)=> {    
    scanInterval(config.apName, config.connectRange, config.leaveRange, config.password, config.scanInterval);
  });
  
}

initialize();
