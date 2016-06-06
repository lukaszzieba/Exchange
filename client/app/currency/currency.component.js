(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('currency', {
            templateUrl: './app/currency/currency.html',
            controller : 'CurrnecyController'
        });
}());
