(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('CurrencyController', CurrencyController);
    CurrencyController.$inject = ['CurrencyService', '$scope', '$rootScope', 'IdentyService', '$http'];

    function CurrencyController(CurrencyService, $scope, $rootScope, IdentyService, $http) {
        var vm = this;
        vm.data = [];
        vm.data = CurrencyService;
        console.log(vm.data);

        // $scope.$watch('vm.data', function() {
        //     console.log('Changed');
        // });

        vm.showAction = function() {
            return IdentyService.isAuthenticated() && $rootScope.currentState === 'exchange';
        };
        vm.cur = {};
        vm.buy = function(currency) {
            vm.cur = currency;
        }
        vm.buySubmit  = function(currency) {
          console.log('Buy submit');
          // $scope.toPay
          // $scope.ammount
          // vm.cur.PurchasePrice
        }
        $scope.ammount = 0;
        $scope.toPay = 0;
        $scope.$watch('ammount', function() {
            $scope.toPay = $scope.ammount * vm.cur.PurchasePrice;
        });

        // activate();
        //
        // function activate() {
        //     return getCurrencies()
        //         .then(function() {
        //             console.log('Currencies view active');
        //             console.log(vm.data);
        //         });
        // }
        //
        // function getCurrencies() {
        //     return CurrencyService.getCurrencies()
        //         .then(function(data) {
        //             vm.data = data;
        //             return vm.data;
        //         });
        // }

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
