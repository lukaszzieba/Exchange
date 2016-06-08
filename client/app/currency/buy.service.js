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

        function buy() {
            return $http.put('/api/protected/buy', buyData).then(function(responese) {
                console.log(responese);
            }, function(err) {
                console.log('Error: ' + err);
            });
        }
    }

}());
