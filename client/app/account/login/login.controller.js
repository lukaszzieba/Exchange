(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('LoginController', LoginController);
    LoginController.$inject = [];

    function LoginController() {
        var vm = this;
        vm.login = function() {
          console.log('Login');
        }
        activate();

        function activate() {

        }
    }
}());
