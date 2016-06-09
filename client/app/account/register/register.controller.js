(function() {
    'use strict';

    angular
        .module('account.module')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', 'RegisterService', 'store', 'IdentyService', '$state'];

    function RegisterController($scope, RegisterService, store, IdentyService, $state) {

        $scope.signupForm = function(newUser) {
            $scope.signup_form.submitted = false;

            if ($scope.signup_form.$valid) {
                // Submit
                RegisterService.registerUser(newUser).
                then(function(response) {
                    if (response.data && response.data.success) {
                        store.set('jwt', response.data.id_token);
                        var t = IdentyService.getDecodedToken();
                        IdentyService.currentUser = t;
                        $state.go('exchange');
                    }
                }, function(err) {
                    console.log(err);
                });
            } else {
                $scope.signup_form.submitted = true;
            }
        };
    }
}());
