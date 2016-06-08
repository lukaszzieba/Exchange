(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('BuyService', BuyService);
    BuyService.$inject = ['$http']

    function BuyService($http) {
        return {
            buy: buy
        }

        function buy(buyData) {
            return $http.put('/api/protected/buy', buyData)
                .then(buySuccess, buyFail);

            function buySuccess(responese) {
                return responese.data;
            }

            function buyFail() {
                console.log('XHR Failed for getWallet.');
            }
        }
    }
}());
