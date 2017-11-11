'use strict';

const bodyParser = require('body-parser');

exports.web = (express, app, tcp, serialCode) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    app.get('/', function (req, res) {
        res.redirect('/static/login.html')
    });

   app.post('/login', async (req, res) => {
      let login = {serial: serialCode, code: 'login', number: req.body.number};
      if (await tcp.sendData(login) === 'true') {
          res.redirect('/main');
      }
      else {
          console.log('로그인 실패');
          res.redirect('/');
      }
   });

    app.post('/register', async (req, res) => {
       let sign = {
           serial: serialCode,
           code: 'sign',
           username: req.body.username,
           email: req.body.email,
           tel: req.body.phone,
           number: req.body.number
       };
       if (await tcp.sendData(sign) === 'true') {
           res.redirect('/');
       } else {
           res.redirect('/static/500_error.html')
       }

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