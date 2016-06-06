(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('NavController', NavController);

    NavController.$inject = ['$rootScope', '$scope'];

    function NavController($rootScope, $scope) {
        var vm = this;
        vm.isActive = function(state) {
          return state === $rootScope.currentState;
        }
        activate();

        function activate() {

        }
    }

}());
