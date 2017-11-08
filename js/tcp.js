'use strict';

const net = require('net');
const address = '203.230.100.59';
const port = 5001;

let server = null;

exports.getConnection = () => {
    try {
        server = net.connect({port: port, host: address}, function () {
            console.log('remote server connection success!!');
            server.setEncoding('utf-8');

            server.on('data', function (data) {
                console.log('From server : ', data);
            });
            server.on('end', function () {
                console.log('Client disconnection');
            });
            server.on('error', function (err) {
                console.log('Socket Error : ', JSON.stringify(err));
                // TODO 서버가 연결되지 않을 때 재접속 시도 및 에러 핸들러 처리
            });
            server.on('timeout', function () {
                console.log('Socket time out');
            });
            server.on('close', function () {
                console.log('Socket Closed');
            });
        })
    } catch (Exception) {
        console.log('Remote server status error');
    }
};