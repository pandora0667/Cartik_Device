'use strict';

// const express = require('express');
// const app = express();
// const http = require('http').createServer(app).listen(3000, function () {
//     console.log('Web socket server running at 3000 port');
// });
// const io = require('socket.io').listen(http);

// const server = require('http').createServer(app);
// server.listen(3000, () => {
//     console.log('listening on port 3000.')
// });
// const io = require('socket.io')(server);
//
// io.sockets.on('connection', (socket) =>  {
//     console.log('--- Web socket connection!! ---');
//     socket.emit('connected', 123);
// });
//
// exports.send = (sensor) => {
// 	let msg = JSON.parse(sensor);
// 	console.log('serial : ', msg.temp);
//     io.socket.emit('mode', msg.mode);
// };

exports.send = (app, sensor) => {
    const server = require('http').createServer(app);
    const io = require('socket.io')(server);

    io.sockets.on('connection', (socket) =>  {
        console.log('--- Web socket connection!! ---');
        socket.emit('connected', 123);
    });

    let msg = JSON.parse(sensor);
    console.log('serial : ', msg.temp);
    io.socket.emit('mode', msg.mode);
};


