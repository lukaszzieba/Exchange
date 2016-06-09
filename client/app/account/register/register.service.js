(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$http', 'ToastrService'];

    function RegisterService($http, ToastrService) {
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
                ToastrService.showToastr(true, respone.data.msg);
                return respone;
            }

            function registerFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }
    }
}());
