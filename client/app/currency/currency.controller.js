(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('CurrencyController', CurrencyController);
    CurrencyController.$inject = ['CurrencyService'];

    function CurrencyController(CurrencyService) {
        var vm = this;
        vm.data = [];

        activate();

        function activate() {
            return getCurrencies()
                .then(function() {
                    console.log('Currencies view active');
                    console.log(vm.data);
                });
        }

        function getCurrencies() {
            return CurrencyService.getCurrencies()
                .then(function(data) {
                    vm.data = data;
                    return vm.data;
                });
        }
    }
}());
