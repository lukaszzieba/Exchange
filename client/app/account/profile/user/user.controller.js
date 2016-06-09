(function() {
    'use strict';

    angular
        .module('account.module')
        .controller('UserCpntroller', UserCpntroller);

    UserCpntroller.$inject = ['$scope', 'UserService'];

    function UserCpntroller($scope, UserService) {
        $scope.updateUser = {};

        $scope.signupForm = function(user) {
            $scope.update_form.submitted = false;

            if ($scope.update_form.$valid) {
                UserService.updateUser(user)
                    .then(function() {
                        $scope.updateUser = user;
                    })

            } else {
                $scope.update_form.submitted = true;
            }
        };

        activate();

        function activate() {
            return getUser()
                .then(function() {
                    console.log('Update user active');
                });
        }

        function getUser() {
            return UserService.getUser()
                .then(function(data) {
                    $scope.updateUser = data;
                    return $scope.updateUser;
                });
        }
    }
}());
