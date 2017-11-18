'use strict';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const host = 'jusk2.asuscomm.com';
const port = 5001;

exports.send = (sensor) => {

    console.log('serial send : ', sensor.front);
    client.send(sensor, 0, sensor.length, port, host, (err, bytes) => {
        if (err) {
            throw  err;
        }
    });
    msg.clear();
    console.log('Message sent');
};
