'use strict'

const serialPort = require('serialport');
const port = '/dev/ttyACM0';

const serialArduino = new serialPort(port, function (err) {
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
