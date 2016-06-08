(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('CurrencyController', CurrencyController);
    CurrencyController.$inject = ['CurrencyService', 'WalletService', 'BuyService', '$scope', '$rootScope', 'IdentyService', '$http'];

    function CurrencyController(CurrencyService, WalletService, BuyService, $scope, $rootScope, IdentyService, $http) {
        var vm = this;
        vm.currencies = [];
        vm.currencies = CurrencyService;

        // show/hide buy button
        vm.showAction = function() {
            return IdentyService.isAuthenticated() && $rootScope.currentState === 'exchange';
        };

        // for buing currency
        vm.cur = {};
        vm.buy = function(currency) {
            vm.cur = currency;
        }
        $scope.ammount = 0;
        $scope.toPay = 0;
        $scope.$watch('ammount', function() {
            $scope.toPay = $scope.ammount * vm.cur.PurchasePrice;
        });
        vm.buySubmit = function(currency) {
            var buyData = {
                code: vm.cur.Code,
                ammount: $scope.ammount,
                toPay: $scope.toPay
            }
            BuyService.buy(buyData)
                .then(function(wallet) {
                    WalletService.wallet = wallet;
                }, function() {

                })
        }

        // tets api
        vm.public = function() {
            $http.get('/api/public').then(function(responese) {
                console.log(responese);
                vm.message = responese.data;
            }, function(err) {
                console.log(err);
            });
        }

        vm.protected = function() {
            $http.get('/api/protected/wallet').then(function(responese) {
                console.log(responese);
                vm.message = responese.data;
            }, function(err) {
                console.log(err.data);
            });
        }
    }
}());
