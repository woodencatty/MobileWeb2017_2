const http = require('http');										//http 요청 모듈

let serverIP = "::ffff:192.168.137.1";
let serverPort = "3010";

POST_DeviceName = {														//POST요청 JSON데이터 정의
	host: "192.168.137.1",
	port: "3010",
	path: '/device/information',
	method: 'POST'
};

POST_DeviceOut = {														//POST요청 JSON데이터 정의
	host: serverIP,
	port: serverPort,
	path: '/device/leave',
	method: 'POST'
};

module.exports = {
	SubmitDeviceName: (ID, version, sort, describe, func) => {
		SubmitDeviceNamecallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';
				response.on('data', function (chunk) {							//응답 데이터를 JSON형태로 파싱함
						console.log("he says " + chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
		}
		let req = http.request(POST_DeviceName, SubmitDeviceNamecallback);
		req.on('error', function (error) {

			console.log('can not connect to APD');								// 관리서버와 연결 불가능할 때에 오류 체크

		});
		req.setHeader("deviceid", ID);											//헤더에 요청 데이터 첨부
		req.setHeader("version", version);											//헤더에 요청 데이터 첨부
		req.setHeader("sort", sort);													//헤더에 요청 데이터 첨부
		req.setHeader("describe", describe);											//헤더에 요청 데이터 첨부
		req.setHeader("func", func);											//헤더에 요청 데이터 첨부
		
		console.log("message send!");
		req.end();
	},
	SubmitDeviceOut: (ID) => {
		SubmitDeviceOutcallback = function (response) {
			console.log('HTTP Response Code : ' + response.statusCode);		//리턴코드를 분석하여 상태 확인
			if (response.statusCode != 200) {
				console.log('Error Response!');

				req.on('error', (e) => {
					console.error(`problem with request: ${e.message}`);
				});
			} else {
				let serverdata = '';
				response.on('data', function (chunk) {							//응답 데이터를 JSON형태로 파싱함
					console.log("he says " + chunk);
				});
				response.on('end', function () {									//응답이 끝났을 시 데이터 추출
					console.log(serverdata);
				});
			}
		}
		let req = http.request(POST_DeviceOut, SubmitDeviceOutcallback);						//POST요청 전송
		req.on('error', function (error) {

			console.log('can not connect to APD' + error);								// 관리서버와 연결 불가능할 때에 오류 체크

		});
		req.setHeader("device_id", ID);											//헤더에 요청 데이터 첨부		
		req.end();
	}
}


function Server_Socket() {
	http.createServer((request, response) => {
	  if (request.method == 'POST') {
		if (request.url == '/func') {

			response.writeHead(200);
			response.end("gotit");
		}
		if (request.url == '/device/leave') {
		  response.writeHead(200);
		  response.end("gotit. bye");    //기기 확인메세지 전송
		}
	  } /* GET method */
	}).listen(3010, () => {
	  console.log('Socket is Running (3010) ...');
	});
  }
  
  Server_Socket();