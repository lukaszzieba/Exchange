var express = require('express'),
    jwt = require('express-jwt'),
    config = require('./config');

var app = express.Router();
var jwtCheck = jwt({
    secret: config.secret
});

app.use('/api/protected', jwtCheck);

app.get('/api/protected/wallet', function(req, res) {
    res.status(200).send('Message fro rotected api');
});

app.post('/api/protected/wallet', function(req, res) {

});

module.exports = app;
