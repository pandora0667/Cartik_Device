'use strict';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const host = 'jusk2.asuscomm.com';
const port = 5001;

exports.send = (sensors) => {
    client.send(sensors, 0, sensors.length, port, host, (err, bytes) => {
        if (err) {
            throw  err;
        }
        console.log('Message sent');
    });
};
