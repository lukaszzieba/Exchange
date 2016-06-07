var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    favicon = require('serve-favicon'),
    config = require('./server/config')

var app = express();

app.use(logger('dev'))
app.use(express.static(config.rootPath + '/client'));
app.use(favicon(config.rootPath + '/client/img/favicon-16x16.png'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

require('./server/mongoose')(config);
app.use(require('./server/account.js'));

app.listen(config.port, function() {
    console.log('Listening on port ' + 8080);
});
