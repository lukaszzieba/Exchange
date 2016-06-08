(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('ProfileController', ProfileController);
    ProfileController.$inject = ['ProfileService'];

    function ProfileController(ProfileService) {
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
            return ProfileService.getFullProfile()
                .then(function(data) {
                    vm.profile = data;
                    return vm.profile;
                });
        }

        vm.saveWallet = function() {
            ProfileService.saveWallet(vm.profile.wallet)
                .then(function(data) {
                  console.log(data);
                });
        }
    }
}());
