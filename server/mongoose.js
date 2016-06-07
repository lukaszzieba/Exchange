var mongoose = require('mongoose'),
    userModel = require('./models/user.js');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'exchange db connection error ...'));
    db.once('open', function() {
        console.log('connected to exchange db');
    });

    userModel.createDefaultUsers();
};
