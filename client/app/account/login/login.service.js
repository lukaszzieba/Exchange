(function() {

    'use strict';

    angular
        .module('account.module')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', 'store', 'IdentyService', 'ToastrService'];

    function LoginService($http, store, IdentyService, ToastrService) {
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
                ToastrService.showToastr(true, respone.data.msg);
                return respone;
            }

            function loginFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }

        function signOut() {
            ToastrService.showToastr(true, 'User loged out.');
            store.remove('jwt');
        }
    }
}())
