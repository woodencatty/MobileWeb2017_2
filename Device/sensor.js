var dhtsensor = require('node-dht-sensor');
var wpi = require('wiring-pi');

wpi.setup('wpi');
const dht22GPIO = 18;

const LEDR = 27;
const LEDG = 28;
const LEDB = 29;

wpi.pinMode(LEDR, wpi.PWM_OUTPUT);
wpi.pinMode(LEDG, wpi.PWM_OUTPUT);
wpi.pinMode(LEDB, wpi.PWM_OUTPUT);

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
        console.log(R);
        console.log(G);
        console.log(B);
 //       wpi.pwmWrite(LEDR, R);
 //       wpi.pwmWrite(LEDG, G);
 //       wpi.pwmWrite(LEDB, B);
        
    }
}

