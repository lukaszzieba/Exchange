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

            function sellFail(err) {
              ToastrService.showToastr(false, err.data.msg)
              return err;
            }
        }
    }
}());
