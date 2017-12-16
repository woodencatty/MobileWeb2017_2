var dhtsensor = require('node-dht-sensor');
var Gpio = require('pigpio').Gpio,
ledR = new Gpio(16, {mode: Gpio.OUTPUT}),
ledG = new Gpio(20, {mode: Gpio.OUTPUT}),
ledB = new Gpio(21, {mode: Gpio.OUTPUT}),
dutyCycle = 0;


const dht22GPIO = 18;

setInterval(function () {
    ledR.pwmWrite(dutyCycle);
    
     dutyCycle += 5;
     if (dutyCycle > 255) {
       dutyCycle = 0;
     }

    }, 20);

module.exports = {
    getTemp: (callback)=>{
        dhtsensor.read(22, dht22GPIO, function(err, temperature, humidity) {
            if (!err) {
                console.log('temp: ' + temperature.toFixed(1) + '°C, ');
                callback(temperature.toFixed(1));
            }
         });
    },
    getHumi: (callback)=>{
        dhtsensor.read(22, dht22GPIO, function(err, temperature, humidity) {
            if (!err) {
                console.log('humidity: ' + humidity.toFixed(1) + '%');
                callback(temperature.toFixed(1));                
            }
         });
    },
    setLED: (R, G, B)=>{
        ledR.pwmWrite(R);
        ledG.pwmWrite(G);
        ledB.pwmWrite(B);
    }
}

