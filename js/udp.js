'use strict';

const dgram = require('dgram');
const client = dgram.createSocket('udp4');

const host = 'jusk2.asuscomm.com';
const port = 5001;

exports.send = (sensors) => {
   // console.log('serial send : ', sensor.temp);
    let msg = new Buffer(sensors);

    client.send(msg, 0, msg.length, port, host, (err, bytes) => {
        if (err) {
            throw  err;
        }
    });
    msg.clear();
    console.log('Message sent');
};
