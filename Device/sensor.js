var dhtsensor = require('node-dht-sensor');
var gpio = require('wiring-pi');

const dht22GPIO = 18;
const LEDR = 40;
const LEDG = 38;
const LEDB = 39;

gpio.wiringPiSetup();
gpio.pinMode(LEDR, wpi.PWM_OUTPUT);
gpio.pinMode(LEDG, wpi.PWM_OUTPUT);
gpio.pinMode(LEDB, wpi.PWM_OUTPUT);

gpio.softPwmCreate(LEDR, 0, 255);
gpio.softPwmCreate(LEDG, 0, 255);
gpio.softPwmCreate(LEDB, 0, 255);

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
        gpio.softPwmWrite(LEDR, R);
        gpio.softPwmWrite(LEDG, G);
        gpio.softPwmWrite(LEDB, B);
    }
}
