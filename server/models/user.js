var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: '{PATH} is required'
    },
    lastName: {
        type: String,
        required: '{PATH} is required'
    },
    email: {
        type: String,
        required: '{PATH} is required',
        unique: true
    },
    wallet: []
});

var User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            User.create({
                firstName: 'joe',
                lastName: 'joe',
                email: 'joe',
                password: 'joe',
                wallet: [{
                    pln: 1000
                }]
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
