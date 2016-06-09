(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('WalletService', WalletService);

    WalletService.$inject = ['$http', 'ToastrService'];

    function WalletService($http, ToastrService) {
        var wallet;
        return {
            wallet: wallet,
            getWallet: getWallet
        };

        function getWallet() {
            var self = this;

            return $http.get('/api/protected/wallet')
                .then(walletSuccess, walletFail);

            function walletSuccess(response) {
                self.wallet = response.data;
                return response.data;
            }

            function walletFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }
    }
}());
