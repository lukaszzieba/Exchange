var express = require('express'),
    jwt = require('express-jwt'),
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

});

module.exports = app;
