(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('NavController', NavController);

    NavController.$inject = ['$rootScope', '$scope', 'IdentyService'];

    function NavController($rootScope, $scope, IdentyService) {
        var vm = this;
        vm.isActive = function(state) {
          return state === $rootScope.currentState;
        }
        vm.identy = IdentyService;
        activate();

        function activate() {

        }
    }

}());
