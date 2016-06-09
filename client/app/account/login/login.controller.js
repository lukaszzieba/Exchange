(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('LoginController', LoginController);
    LoginController.$inject = ['$scope', 'LoginService', 'store', '$state', 'IdentyService'];

    function LoginController($scope, LoginService, store, $state, IdentyService) {
        var vm = this;
        vm.userData = {}
        vm.login = function(userData) {

            $scope.login_form.submitted = false;

            console.log($scope.login_form.$valid);
            if ($scope.login_form.$valid) {
                LoginService.login(userData)
                    .then(function(response) {
                        store.set('jwt', response.data.id_token);
                        var t = IdentyService.getDecodedToken();
                        IdentyService.currentUser = t;                        
                        $state.go('exchange');
                        vm.userData = {}
                    }, function(err) {
                        console.log(err);
                    });
            } else {
                $scope.login_form.submitted = true;
            }
        }

        vm.logOut = function() {
            LoginService.signOut();
            IdentyService.currentUser = undefined;
            $state.go('home');
        }

        vm.identy = IdentyService;
        activate();

        function activate() {

        }
        // $('#btnSignin').on('click', function() {
        //     // $("#dlDropDown").dropdown("toggle");
        //     $(this).closest(".dropdown-menu").prev().dropdown("toggle");
        // });
    }
}());
