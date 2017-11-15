'use strict';

const serialPort = require('serialport');
const socket = require('./socket');
const GPS = require('gps');
const gps = new GPS;

const port1 = '/dev/ttyACM1';
const port2 = '/dev/ttyACM0';

let lat = 36.350840;
let lon = 127.300603;
let speed = 10;

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
            //  console.log('no gps');
        }
    });

    gps.on('data', function (data) {
        lat = gps.state.lat.toString().substring(0, 7);
        lon = gps.state.lon.toString().substring(0, 9);
        speed = gps.state.speed.toString().substring(0, 3);
    });
};

exports.getArduino = (app) => {
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
                try {
                    let msg = JSON.parse(str);
                    let sensor = {
                        code: 'arduino',
                        mode: msg.mode,
                        impulse: msg.impulse,
                        front: msg.front,
                        rear: msg.rear,
                        left: msg.left,
                        right: msg.right,
                        temp: msg.temperature,
                        humi: msg.humidity,
                        lat: lat,
                        lon: lon,
                        speed: speed
                    };
                    console.log('P : ', sensor.lat);
                    // socket.send(JSON.stringify(sensor));
                    socket.send(app, sensor);
                } catch (Exception) {
                }
            }
        }
    });
};

