(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('wallet', {
            templateUrl: './app/wallet/wallet.html',
            controller: 'WalletController'
        });
}());
