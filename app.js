'use strict';

console.log('Cartik device for javascript program version 2.0');

const express = require('express');
const app = express();
const service = require('./routers/index');
const serial = require('./js/serial');

serial.getGPS();
serial.getArduino();

app.use('/static', express.static(__dirname + '/views'));

service.web(express, app);

app.listen(5000, () => {
    console.log('Web server running at port 5000');
});
