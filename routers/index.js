'use strict';

const bodyParser = require('body-parser');

exports.web = (express, app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.route('/')
        .get(function (req, res) {
            res.redirect('/static/testMain.html');
        });

    app.get('/car', (req, res) => {
        res.sendFile((__dirname + '/static/testCarStatus.html'));
    });

    app.get('/status', (req, res) => {
        res.sendFile((__dirname + '/static/internalStatus.html'));
    });

    app.get('/gps', (req, res) => {
        res.sendFile((__dirname + '/static/map.html'));
    });

    app.get('/driver', (req, res) => {
        res.sendFile((__dirname + '/static/driver.html'));
    });

    app.use(function (req, res, next) {
        res.status(404).redirect('/static//404_error.html');
    });

    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(500).redirect('/static/500_error.html');
    });
};