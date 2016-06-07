(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('CurrencyController', CurrencyController);
    CurrencyController.$inject = ['CurrencyService', '$scope', '$rootScope', 'IdentyService'];

    function CurrencyController(CurrencyService, $scope, $rootScope, IdentyService) {
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
    }
}());
