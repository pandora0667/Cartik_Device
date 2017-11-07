'use strict';

console.log('Cartik device for javascript program version 1.0');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/views'));

// app.get('/', function (req, res) {
//     res.sendFile((__dirname + '/views/login.html'));
// });

app.route('/')
    .get(function (req, res) {
        res.sendFile((__dirname + '/views/login.html'));
    })
    .post(function (req, res) {
        res.send('check');
    });

// app.use(function (req, res, next) {
//     let err = new Error('Not Found');
//     err.status(404);
//     next(err);
// });

app.listen(8080, function () {
    console.log('Web server running at port 8080');
});
