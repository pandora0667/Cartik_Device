'use strict';

const bodyParser = require('body-parser');

exports.web = (express, app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.route('/')
        .get(function (req, res) {
            res.redirect('/static/main.html');
        });

    app.use(function (req, res, next) {
        res.status(404).redirect('/static//404_error.html');
    });

    app.use(function (err, req, res, next) {
        console.log(err.stack);
        res.status(500).redirect('/static/500_error.html');
    });
};