(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('WalletController', WalletController);
    WalletController.$inject = ['WalletService', 'CurrencyService', 'SellService', '$scope'];

    function WalletController(WalletService, CurrencyService, SellService, $scope) {
        var vm = this;
        vm.userWallet = WalletService;
        vm.currencies = CurrencyService.collection;
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
            if (vm.currencies.length !== 0 && vm.currencies[0].Items !== undefined) {
                vm.currencies[0].Items.forEach(function(item) {
                    if (item.Code === cur.code) {
                        price = item.SellPrice;
                    }
                });
            }
            return price;
        };

        // geting value
        vm.getValue = function(cur) {
            var unitPrice = vm.getUintPrice(cur);
            return (cur.ammount / cur.unit) * unitPrice;
        };

        // for sell
        vm.cur = {};
        $scope.youHave = 0;
        $scope.ammount = 0;
        $scope.toGet = 0;

        vm.sell = function(currency) {
            $scope.youHave = currency.ammount;
            vm.cur = currency;
            console.log(vm.cur);
        };

        $scope.$watch('ammount', function(newVal) {
            $scope.toGet = ($scope.ammount / vm.cur.unit) * vm.getUintPrice(vm.cur);
            $scope.youHave = vm.cur.ammount - newVal;
        });

        vm.sellSubmit = function(currency) {
            var sellData = {
                code: vm.cur.Code,
                ammount: $scope.ammount,
                toPay: $scope.toPay
            }
            clearSellData();
            SellService.sell(sellData)
                .then(function(wallet) {
                    WalletService.wallet = wallet;
                }, function() {

                })
        };

        vm.cancelSell = function() {
            $('#sellModal').modal('hide');
            clearSellData();
        };

        function clearSellData() {
            vm.cur = {};
            $scope.ammount = 0;
            $scope.toPay = 0;
        }

        $('#sellModal').on('hide.bs.modal', function(event) {
            clearSellData();
        });
    }
}());
