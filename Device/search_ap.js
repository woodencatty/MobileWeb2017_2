const sendData = require('./rest_api.js')   //포스터기기 연결 모듈 import

var wifi = require('node-wifi');

wifi.init({
    iface: null // network interface, choose a random wifi interface if set to null 
});

module.exports = {
    searchAPD: (apName, password, connectRange, leaveRange) => {
        wifi.getCurrentConnections((err, curcon) => {
            console.log(curcon);
            //todo : check signal
            /*if (curcon[0].signal_level > connectRange && searched == false) {
                sendData.SubmitDeviceName('LED001', "1.0", "LED", "LED전등");
                searched = true;
            }
            if (curcon[0].signal_level < leaveRange && searched == true) {
                sendData.SubmitDeviceOut();
                searched = false;
            }*/
        });
    }
}