const scanAP = require('./search_ap.js')   //포스터기기 탐색 모듈 import


function scanInterval(apName, connectRange, leaveRange, password, scanInterval) {
    this.scanInterval = setInterval(() => {
      scanAP.searchAPD(apName, password, connectRange, leaveRange);
    }, scanInterval);
  }

function initialize() {
    scanInterval(config.apName, config.connectRange, config.leaveRange, config.password, config.scanInterval);
}

initialize();
