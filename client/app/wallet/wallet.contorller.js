(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('WalletController', WalletController);
    WalletController.$inject = ['WalletService', 'CurrencyService', '$scope'];

    function WalletController(WalletService, CurrencyService, $scope) {
        var vm = this;
        vm.userWallet = WalletService
        vm.currencies = CurrencyService.collection
        activate();

        function activate() {
            return getWallet()
                .then(function() {
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

        // getting current sell price
        vm.getUintPrice = function(cur) {
            var price = 0;
            vm.currencies[0].Items.forEach(function(item) {
                if (item.Code === cur.code) {
                    price = item.SellPrice;
                    console.log(price);
                }
            });
            return price;
        }
        
    }
}());
