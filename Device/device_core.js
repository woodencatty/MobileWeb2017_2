const scanAP = require('./search_ap.js')   
const fs = require('fs');

function scanInterval(apName, connectRange, leaveRange, password, scanInterval) {
    this.scanInterval = setInterval(() => {
      scanAP.searchDevice();
    }, scanInterval);
  }

function initialize() {

  fs.readFile('./settings.conf', 'utf8',(err, data)=> {  
    var config = JSON.parse(data);    
    scanInterval(config.apName, config.connectRange, config.leaveRange, config.password, config.scanInterval);
  });
}



initialize();
