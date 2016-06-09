(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('BuyService', BuyService);
    BuyService.$inject = ['$http', 'ToastrService']

    function BuyService($http, ToastrService) {
        return {
            buy: buy
        }

        function buy(buyData) {
            return $http.put('/api/protected/buy', buyData)
                .then(buySuccess, buyFail);

            function buySuccess(responese) {
                return responese.data;
            }

            function buyFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }
    }
}());
