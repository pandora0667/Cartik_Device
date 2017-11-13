'use strict';

const express = require('express');
const app = express();
const http = require('http').createServer(app).listen(3000, function () {
    console.log('Web socket server running at 3000 port');
});
const io = require('socket.io').listen(http);

io.sockets.on('connection', function (socket) {
    console.log('--- Web socket connection!! ---');
    socket.emit('connected', 123);
});

exports.send = (sensor) => {
	let msg = JSON.parse(sensor);
	console.log(msg);
    io.socket.emit('mode', msg.mode);
};

