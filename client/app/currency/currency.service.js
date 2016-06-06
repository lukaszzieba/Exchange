(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('CurrencyService', CurrencyService);
    CurrencyService.$inject = ['$http'];

    function CurrencyService($http) {
        return {
            getCurrencies: getCurrencies
        };

        function getCurrencies() {
            return $http.get('./app/currency/data.json')
                .then(getCurrenciesComplete)
                .catch(getCurrenciesFiled);

            function getCurrenciesComplete(responese) {
                return responese.data;
            }

            function getCurrenciesFiled() {
                console.log('XHR Failed for getCurrencies.');
            }
        }
    }
}());

// $http.get('webtask.future-processing.com:8068/currencies', {
//         headers: {
//           'Accept' : 'application/json'
//         }
//     })
