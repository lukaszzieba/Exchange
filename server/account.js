var express = require('express'),
    _ = require('lodash'),
    bcrypt = require('bcryptjs'),
    config = require('./config'),
    jwt = require('jsonwebtoken');


var app = express.Router();
var token;
var User = require('mongoose').model('User');

function createToken(user) {
    console.log(user);
    token = jwt.sign(_.omit(user, 'password'), config.secret, {
        expiresIn: 9000000
    });
    // Logs
    console.log('On token create:');
    console.log(token);
    return token;
}

app.post('/register', function(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (user) {
            return res.status(400).send("A user with that username already exists");
        }
    });
    var hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    var user = {};
    user.firstName = req.body.name;
    user.lastName = req.body.lastName;
    user.email = req.body.email;
    user.password = hash;
    user.wallet = generateWallet();

    User.create(user, function(err, user) {
        if (err) {
            if (err.toString().indexOf('E11000') > -1) {
                console.log('Error: ' + err);
                err = new Error('Duplicate username');
            }
            res.status(400);
            return res.send({
                reason: err.toString()
            });
        }
        if (user) {
            var userToken = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                wallet: user.wallet
            }
            res.status(201).send({
                id_token: createToken(userToken)
            });
        }
    });
});

function generateWallet() {
    return [{
        unit: 1,
        code: 'PLN',
        ammount: 1000
    }, {
        unit: 1,
        code: 'GBP',
        ammount: 100
    }, {
        unit: 1,
        code: 'EUR',
        ammount: 0
    }, {
        unit: 1,
        code: 'USD',
        ammount: 0
    }, {
        unit: 100,
        code: 'CZK',
        ammount: 0
    }, {
        unit: 1,
        code: 'CHF',
        ammount: 0
    }, {
        unit: 0,
        code: 'RUB',
        ammount: 0
    }]
}

app.post('/login', function(req, res) {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send("You must send the username and the password");
    }
    User.findOne({
        email: req.body.email
    }, function(err, user) {
        if (err) {
            return res.status(401).send(err);
        }
        if (!user) {
            return res.status(401).send("User don't exist");
        }
        if (bcrypt.compareSync(req.body.password, user.password)) {
            var userToken = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                wallet: user.wallet
            }
            res.status(201).send({
                id_token: createToken(userToken)
            });

        } else {
            return res.status(401).send("The username or password don't match");
        }
    });
});



module.exports = app;
