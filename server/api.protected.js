var express = require('express'),
    jwt = require('express-jwt'),
    _ = require('lodash'),
    config = require('./config'),
    User = require('mongoose').model('User');

var app = express.Router();
var jwtCheck = jwt({
    secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/wallet', function(req, res) {
    User.findOne({
        email: req.user.email
    }, function(err, user) {
        if (user) {
            return res.status(200).json(user.wallet);
        }
    });
});

app.post('/api/protected/wallet', function(req, res) {
    User.findOne({
        email: req.user.email
    }, function(err, user) {
        if (user) {
            return res.status(200).json(user.wallet);
        }
    });
});

app.put('/api/protected/buy', function(req, res) {
    console.log(req.body);
    User.findOne({
        email: req.user.email
    }, function(err, user) {
        if (user) {
            _.find(user.wallet, function(c) {
                return c.code === 'PLN';
            }).ammount -= req.body.toPay;

            _.find(user.wallet, function(c) {
                return c.code === req.body.code;
            }).ammount += req.body.ammount;
            user.save();
        }
    });
});

module.exports = app;
