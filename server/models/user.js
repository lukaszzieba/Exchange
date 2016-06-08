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
    wallet: [{
        unit: Number,
        code: String,
        ammount: Number
    }]
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
                    ammount: 100
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
                    unit: 100,
                    code: 'RUB',
                    ammount: 0
                }]
            });
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;
