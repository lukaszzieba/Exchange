(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('currency', {
            bindingd: {},
            templateUrl: './app/currency/currency.html',
            controller : 'CurrencyController'
        });
}());
