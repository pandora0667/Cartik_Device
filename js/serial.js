'use strict';

const serialPort = require('serialport');
const GPS = require('gps');
const gps = new GPS;

const port1 = '/dev/ttyACM0';
const port2 = '/dev/ttyACM1';

exports.getGPS = () => {
    const serialGPS = new serialPort(port1, function (err) {
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
        let lat = gps.state.lat.toString().substring(0, 7);
        let lon = gps.state.lon.toString().substring(0, 9);
        let speed = gps.state.speed.toString().substring(0, 3);

        if (lat !== undefined && lon !== undefined) {
            console.log('lat : ', lat);
            console.log('lon : ', lon);
            console.log('speed : ', speed);
        }
    });
};

exports.getArduino = () => {
    const serialArduino = new serialPort(port2, function (err) {
        if (err) {
            return console.log('Error : ', err.message);
        }
    });

    let seTmpData = '';

    serialArduino.on('open', function () {
        console.log('Arduino serial open');
        serialArduino.flush();
    });

    serialArduino.on('data', function (data) {
        const mbRex = new Buffer(data);
        const string = mbRex.toString('ascii').trim();

        if (string.indexOf('{') > -1 || seTmpData.length > 0) {
            seTmpData = seTmpData + string;
            const indexFirst = seTmpData.indexOf('{');
            const indexLast = seTmpData.indexOf('}');

            if (indexFirst !== -1 && indexLast !== -1) {
                let seSensingData = seTmpData.substr(indexFirst, indexLast + 1);
                seTmpData = '';

                let re = /\0/g;
                let str = seSensingData.replace(re, "");
                console.log(str);
                try {
                    let msg = JSON.parse(str);
                    //	console.log('mode:', msg.mode, 'impulse: ', msg.impulse);
                } catch (Exception) {
                    console.log('Json parsing error');
                }
            }
        }
    });
};

