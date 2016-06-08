(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('SellService', SellService);
    SellService.$inject = ['$http'];

    function SellService($http) {
        return {
            sell: sell
        }

        function sell(sellData) {
            return $http.put('/api/protected/sell', sellData)
                .then(sellSuccess, sellFail);

            function sellSuccess(responese) {
                return responese.data;
            }

            function sellFail() {
                console.log('XHR Failed for getWallet.');
            }
        }
    }
}());
