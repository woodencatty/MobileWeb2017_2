const scanAP = require('./search_ap.js');
const sensor = require('./sensor.js');   
const fs = require('fs');
const http = require('http');

function scanInterval(scanInterval) {
    this.scanInterval = setInterval(() => {
			scanAP.searchServer();
			console.log("scanning..");
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
			sensor.setLED(request.headers.colorr,request.headers.colorg,request.headers.colorb);
			response.writeHead(200);
			response.end("gotit");
		}else if (request.url == '/func/temp') {
			gettempcallback = (temp) =>{
				response.writeHead(200);				
				response.end(temp.toString());    //기기 확인메세지 전송
			}				
			sensor.getTemp(gettempcallback);
		}else if (request.url == '/func/humi') {
			gethumicallback = (humi) =>{
				response.writeHead(200);				
				response.end(humi.toString());    //기기 확인메세지 전송
			}				
			sensor.getHumi(gethumicallback);
		}
	  } /* GET method */
	}).listen(3010, () => {
	  console.log('Socket is Running (3010) ...');
	});
  }


initialize();
Server_Socket();