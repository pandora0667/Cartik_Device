'use strict';

const bodyParser = require('body-parser');

exports.web = (express, app) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.get('/', function (req, res) {
        res.redirect('/static/login.html')
    });

    app.post('/login', function (req, res) {
        let number = req.body.number;
        console.log(number);
        res.redirect('/main');
    });

    app.post('/register', function (req, res) {
        console.log(req.body.username);
        console.log(req.body.email);
        console.log(req.body.phone);
        console.log(req.body.number);
        res.send('register');
    });

    app.route('/main')
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