var express = require('express'),
    bodyParser = require('body-parser'),
    logger = require('morgan'),
    favicon = require('serve-favicon');

var app = express();

app.use(express.static(__dirname + '/client'));
app.use(favicon(__dirname + '/client/img/favicon-16x16.png'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/currencies', function(req, res) {

});

app.listen(8080, function() {
    console.log('Listening on port ' + 8080);
});
