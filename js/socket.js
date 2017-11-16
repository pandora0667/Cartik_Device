'use strict';

const express = require('express');
const app = express();
const server = require('http').createServer(app);

server.listen(3000, () => {
    console.log('listening on port 3000.')
});
const io = require('socket.io')(server);

io.sockets.on('connection', (socket) =>  {
    console.log('--- Web socket connection!! ---');
    socket.emit('connected', 123);
});

exports.send = (sensor) => {
	let msg = JSON.parse(sensor);
	console.log('serial : ', msg.temp);

    io.sockets.emit('mode', msg.mode);
    io.sockets.emit('impulse', msg.impulse);
    io.sockets.emit('lat', msg.lat);
    io.sockets.emit('lon', msg.lon);
    io.sockets.emit('speed', msg.speed);
    io.sockets.emit('front', msg.front);
    io.sockets.emit('rear', msg.rear);
    io.sockets.emit('left', msg.left);
    io.sockets.emit('right', msg.right);
    io.sockets.emit('temp', msg.temp);
    io.sockets.emit('humi', msg.humi);

};

