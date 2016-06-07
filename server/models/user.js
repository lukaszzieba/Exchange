var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs');

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
    password: {
        type: String,
        required: '{PATH} is required'
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
                password: bcrypt.hashSync('joe', bcrypt.genSaltSync(10)),
                wallet: [{
                    pln: 1000
                }]
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
