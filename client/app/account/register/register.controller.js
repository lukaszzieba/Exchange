(function() {
    'use strict';

    angular
        .module('account.module')
        .controller('RegisterController', RegisterController);
    RegisterController.$inject = ['$scope', 'RegisterService', 'store', 'IdentyService'];

    function RegisterController($scope, RegisterService, store, IdentyService) {


        $scope.signupForm = function(newUser) {

            $scope.signup_form.submitted = false;

            if ($scope.signup_form.$valid) {
                // Submit
                RegisterService.registerUser(newUser).
                then(function(response) {
                    store.set('jwt', response.data.id_token);
                    var t = IdentyService.getDecodedToken();
                    IdentyService.currentUser = t;
                    console.log(t);
                }, function(err) {
                    console.log(err);
                });
            } else {
                $scope.signup_form.submitted = true;
            }
        }
        activate();

        function activate() {

        }
    }
}());
