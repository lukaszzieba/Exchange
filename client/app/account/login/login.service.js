(function() {

    'use strict';

    angular
        .module('account.module')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', 'store', 'IdentyService'];

    function LoginService($http, store, IdentyService) {
        return {
            login: login,
            signOut: signOut
        }

        function login(user) {
            return $http({
                    url: '/login',
                    method: 'POST',
                    data: user
                })
                .then(loginSuccess, loginFail);

            function loginSuccess(respone) {
                return respone;
            }

            function loginFail(err) {
                // Log
                console.log(err.data);
            }
        }

        function signOut() {
            store.remove('jwt');                       
        }
    }
}())
