(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('WalletService', WalletService);
    WalletService.$inject = ['$http'];

    function WalletService($http) {
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

            function walletFail() {
                console.log('XHR Failed for getWallet.');
            }
        }
    }
}());
