'use strict';

console.log('Cartik device for javascript program version 1.0');

const express = require('express');
const app = express();
const service = require('./routers/index');
const serial = require('./js/serial');
const tcp = require('./js/tcp');

serial.getGPS();
serial.getArduino();
tcp.getConnection();

app.use('/static', express.static(__dirname + '/views'));

service.web(express, app);


app.listen(8080, function () {
    console.log('Web server running at port 8080');
});
