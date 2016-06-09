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

app.get('/api/protected/user', function(req, res) {
    User.findOne({
        email: req.user.email
    }, function(err, user) {
        if (user) {
            // var toUpdate = {
            //     firstName: user.firstName,
            //     lastName: user.lastName
            // }
            return res.status(200).json(user);
        }
    });
});

app.put('/api/protected/user', function(req, res) {
    User.findOne({
        email: req.user.email
    }, function(err, user) {
        if (user) {
            user.firstName = req.body.firstName;
            user.lastName = req.body.lastName;
            user.save();
            return res.status(200).json(user);
        }
    });
});

app.put('/api/protected/wallet', function(req, res) {
    console.log(req.body);
    User.findOne({
        email: req.user.email
    }, function(err, user) {
        if (user) {
            user.wallet = req.body;
            user.save();
            return res.status(200).json(user);
        }
    });
});

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
            return res.status(200).json(user.wallet);
        }
    });
});

app.put('/api/protected/sell', function(req, res) {
    console.log(req.body);
    User.findOne({
        email: req.user.email
    }, function(err, user) {
        if (user) {
            _.find(user.wallet, function(c) {
                return c.code === 'PLN';
            }).ammount += req.body.toGet;

            _.find(user.wallet, function(c) {
                return c.code === req.body.code;
            }).ammount -= req.body.sellUnits;
            user.save();
            return res.status(200).json(user.wallet);
        }
    });
});

module.exports = app;
