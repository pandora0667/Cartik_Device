'use strict';

const net = require('net');
const domain = require('domain');
const errorHandler = domain.create();  // deprecate 되어 있으나 마땅한 대안이 존재하지 않음

const address = '192.168.1.33';
const port = 5001;
let server = null;
// state 정보를 가지고 확인했다가 타이머를 두고 재시도


exports.getConnection = () => {

    connection()
        .then(function (status) {
            console.log(status);
        });
};

exports.sendData = async (msg) => {
    const send = (msg) => {
        console.log('Data send');
        if (server !== null) {
            server.write(JSON.stringify(msg))
        }
    };

    await send(msg);
    return await receive();
};

function connection() {
    return new Promise(resolve => {
        errorHandler.run(() => {
            server = net.connect({port: port, host: address}, function () {
                console.log('remote server connection success!!');
                this.on('end', function () {
                    console.log(' Client disconnected');
                });
                this.on('error', function (err) {
                    console.log('Socket Error: ', JSON.stringify(err));
                });
                this.on('timeout', function () {
                    console.log('Socket Timed Out');
                });
                resolve(true);
            });
        });

        errorHandler.on('error', (err) => {
            console.log('server not connection');
            resolve(false);
        });
    });
}

function receive() {
    console.log('Data receive');
    return new Promise(resolve => {
        server.on('data', function (data) {
            let re = /\0/g;
            let str = data.toString().replace(re, '');
            let msg = JSON.parse(str);
            resolve(msg);
        })
    })
}
