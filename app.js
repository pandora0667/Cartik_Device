'use strict';

console.log('Cartik device for javascript program version 1.0');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', express.static(__dirname + '/views'));


app.route('/')
    .get(function (req, res) {
        res.sendFile((__dirname + '/views/login.html'));
    })
    .post(function (req, res) {
        res.send('check');
    });

app.route('/main')
    .get(function (req, res) {
        res.sendFile((__dirname + '/views/main.html'))
    });

app.use(function (req, res, next) {
    res.status(404).sendFile((__dirname + '/views/404_error.html'));
});

app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).sendFile((__dirname + '/views/500_error.html'));
});

app.listen(8080, function () {
    console.log('Web server running at port 8080');
});
