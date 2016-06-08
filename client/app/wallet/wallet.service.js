(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('WalletService', WalletService);
    WalletService.$inject = ['$http'];

    function WalletService($http) {
        return {
            getWallet: getWallet
        };

        function getWallet() {
            return $http.get('/api/protected/wallet')
                .then(walletSuccess, walletFail);

            function walletSuccess(response) {
                return response.data;
            }

            function walletFail() {
                console.log('XHR Failed for getWallet.');
            }
        }
    }
}());
