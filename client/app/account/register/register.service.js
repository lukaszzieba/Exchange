(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('RegisterService', RegisterService);
    RegisterService.$inject = ['$http'];

    function RegisterService($http) {
        return {
            registerUser: registerUser
        }

        function registerUser(user) {
            return $http({
                url: '/register',
                method: 'POST',
                data: user
            }).then(registerSuccess, registerFail)

            function registerSuccess(respone) {
                return respone;
            }

            function registerFail(err) {
                console.log(err.data);
            }
        }

    }

}());
