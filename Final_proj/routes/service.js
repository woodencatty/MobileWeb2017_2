const http = require('http');										//http 요청 모듈

let HostIP = "";
let HostPort = "3010";

SET_LED = {														//POST요청 JSON데이터 정의
    host: serverIP,
    port: serverPort,
    path: '/func/led',
    method: 'GET'
};

GET_TEMP = {														//POST요청 JSON데이터 정의
    host: serverIP,
    port: serverPort,
    path: '/func/temp',
    method: 'GET'
};

GET_HUMI = {														//POST요청 JSON데이터 정의
    host: serverIP,
    port: serverPort,
    path: '/func/humi',
    method: 'GET'
};

module.exports = {
    getHostIP: (IP) => {
        HostIP = IP;

    },
    LEDsetting: (status, colorR, colorG, colorB) => {
        ledsettingcallback = function (response) {
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
        let req = http.request(SET_LED, ledsettingcallback);
        req.on('error', function (error) {

            console.log('can not connect to APD');								// 관리서버와 연결 불가능할 때에 오류 체크

        });
        req.setHeader("status", status);											//헤더에 요청 데이터 첨부
        req.setHeader("colorR", colorR);
        req.setHeader("colorG", colorG);
        req.setHeader("colorB", colorB);
        
        console.log("message send!");
        req.end();
    },

    TEMPget : () => {
        tempgetcallback = function (response) {
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
      let req = http.request(GET_TEMP, tempgetcallback);
      req.on('error', function (error) {

          console.log('can not connect to APD');								// 관리서버와 연결 불가능할 때에 오류 체크

      });
      req.setHeader("deviceid", ID);											//헤더에 요청 데이터 첨부
      
      console.log("message send!");
      req.end();
  },
  
  HUMIget : () => {
    humigetcallback = function (response) {
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
  let req = http.request(GET_HUMI, humigetcallback);
  req.on('error', function (error) {

      console.log('can not connect to APD');								// 관리서버와 연결 불가능할 때에 오류 체크

  });
  req.setHeader("deviceid", ID);											//헤더에 요청 데이터 첨부
  
  console.log("message send!");
  req.end();
}


/*
          <<service_name>> : () => {
              <<service_name>>callback = function (response) {
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
            let req = http.request(<<restObj>>, <<service_name>>callback);
            req.on('error', function (error) {
    
                console.log('can not connect to APD');								// 관리서버와 연결 불가능할 때에 오류 체크
    
            });
            req.setHeader("deviceid", ID);											//헤더에 요청 데이터 첨부
        	
            console.log("message send!");
            req.end();
        }
*/

}