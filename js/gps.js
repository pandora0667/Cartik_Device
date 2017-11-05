'use strict'

const serialPort = require('serialport');
const GPS = require('js/gps');
const port = '/dev/ttyACM1';
const gps = new GPS;

const serialGPS = new serialPort(port, function (err) {
    if (err) {
        return console.log('Error : ', err.message);
    }
});

serialGPS.on('open', function () {
    console.log('GPS serial open');
    serialGPS.flush();
});

serialGPS.on('data', function (data) {
    try {
        const string = '' + data;
        gps.updatePartial(string);
    } catch (Exception) {
        console.log('no gps');
    }
});

gps.on('data', function (data) {
    if (gps.state.lat !== undefined && gps.state.lon !== undefined) {
        console.log('lat : ', gps.state.lat.toString().substring(0, 7));
        console.log('lon : ', gps.state.lon.toString().substring(0, 9));
        console.log('speed : ', gps.state.speed.toString().substring(0, 3));
    }
});
