(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('CurrencyController', CurrencyController);
    CurrencyController.$inject = ['CurrencyService', '$scope'];

    function CurrencyController(CurrencyService, $scope) {
        var vm = this;
        vm.data = [];
        vm.data = CurrencyService;
        console.log(vm.data);

        $scope.$watch('vm.data', function() {
          console.log('Changed');
        })

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
