'use strict';

console.log('Cartik device for javascript program version 1.2');

const express = require('express');
const app = express();
const service = require('./routers/index');
const serial = require('./js/serial');
// const tcp = require('./js/tcp');
// const socket = require('./js/socket');
const serialCode = '001';


// tcp.getConnection();
serial.getGPS();
serial.getArduino(serialCode);

app.use('/static', express.static(__dirname + '/views'));

service.web(express, app, serialCode);

app.listen(5000, function () {
    console.log('Web server running at port 5000');
});
