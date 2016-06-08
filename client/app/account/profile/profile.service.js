(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('ProfileService', ProfileService);
    ProfileService.$inject = ['$http'];

    function ProfileService($http) {
        return {
            getFullProfile: getFullProfile,
            saveWallet: saveWallet
        }

        function getFullProfile() {
            return $http.get('/api/protected/user')
                .then(getProflileSuccess, getProflileFail);

            function getProflileSuccess(response) {
                return response.data;
            }

            function getProflileFail() {
                console.log('XHR Failed for getFullProfile.');
            }
        }

        function saveWallet(wallet) {
            return $http.put('/api/protected/user', wallet)
                .then(updateWalletSuccess, updateWalletFail);

            function updateWalletSuccess(response) {
                return response.data;
            }

            function updateWalletFail() {
                console.log('XHR Failed for getFullProfile.');
            }
        }
    }
}());
