var mongoose = require('mongoose');


var exchangeSchema = mongoose.Schema({
    currencies: [{
        unit: Number,
        code: String,
        ammount: Number
    }]
});

var Exchange = mongoose.model('Exchange', exchangeSchema);

function createDefaultExchange() {
    Exchange.find({}).exec(function(err, collection) {
        if (collection.length === 0) {
            Exchange.create({
                currencies: [{
                    unit: 1,
                    code: 'PLN',
                    ammount: 100
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
                    ammount: 100
                }, {
                    unit: 100,
                    code: 'CZK',
                    ammount: 100
                }, {
                    unit: 1,
                    code: 'CHF',
                    ammount: 100
                }, {
                    unit: 100,
                    code: 'RUB',
                    ammount: 100
                }]
            });
        }
    });
}

exports.createDefaultExchange = createDefaultExchange;
