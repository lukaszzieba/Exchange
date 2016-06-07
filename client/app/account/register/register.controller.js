(function() {
    'use strict';

    angular
        .module('account.module')
        .controller('RegisterController', RegisterController);
    RegisterController.$inject = ['$scope'];

    function RegisterController($scope) {


        $scope.signupForm = function() {
            $scope.signup_form.submitted = false;
            console.log($scope.signup_form.$valid);
            if ($scope.signup_form.$valid) {
                // Submit
                console.log('Valid');
            } else {
                $scope.signup_form.submitted = true;
            }
        }
        activate();

        function activate() {

        }
    }
}());
