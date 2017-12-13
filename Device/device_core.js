const scanAP = require('./search_ap.js');
const scanAP = require('./sensor.js');   
const fs = require('fs');

function scanInterval(scanInterval) {
    this.scanInterval = setInterval(() => {
      scanAP.searchServer();
    }, scanInterval);
  }

function initialize() {

  fs.readFile('./settings.conf', 'utf8',(err, data)=> {  
    var config = JSON.parse(data);    
    scanInterval(config.scanInterval);
  });
}

function Server_Socket() {
	http.createServer((request, response) => {
	  if (request.method == 'GET') {
		if (request.url == '/func/led') {

			response.writeHead(200);
			response.end("gotit");
		}else if (request.url == '/func/temp') {
		  response.writeHead(200);
		  response.end("gotit.");    //기기 확인메세지 전송
		}else if (request.url == '/func/humi') {
		  response.writeHead(200);
		  response.end("gotit.");    //기기 확인메세지 전송
		}
	  } /* GET method */
	}).listen(3010, () => {
	  console.log('Socket is Running (3010) ...');
	});
  }


initialize();
Server_Socket();