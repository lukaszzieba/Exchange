(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('WalletController', WalletController);
    WalletController.$inject = ['WalletService'];

    function WalletController(WalletService) {
        var vm = this;
        vm.wallet = []
        activate();

        function activate() {
            return getWallet()
                .then(function() {
                    console.log('Wallet');
                    console.log(vm.wallet);
                    console.log('Activate wallet');
                });
        }

        function getWallet() {
            return WalletService.getWallet()
                .then(function(data) {
                  vm.wallet = data;
                    return vm.wallet;
                });
        }
    }
}());
