(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('DefineWalletController', DefineWalletController);
    DefineWalletController.$inject = ['DefineWalletService'];

    function DefineWalletController(DefineWalletService) {
        var vm = this;
        vm.profile;

        activate();

        function activate() {
            return getProfile()
                .then(function() {
                    console.log('Activate proflie');
                });
        }

        function getProfile() {
            return DefineWalletService.getFullProfile()
                .then(function(data) {
                    vm.profile = data;
                    return vm.profile;
                });
        }

        vm.saveWallet = function() {
            DefineWalletService.saveWallet(vm.profile.wallet)
                .then(function(data) {
                  console.log(data);
                });
        }
    }
}());
