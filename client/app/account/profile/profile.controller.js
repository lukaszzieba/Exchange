(function() {
    'use strict';

    angular
        .module('account.module')
        .controller('ProflieController', ProflieController);

    ProflieController.$inject = ['$rootScope'];

    function ProflieController($rootScope) {
        var vm = this;
        vm.isActive = function(state) {
            return state === $rootScope.currentState;
        }
    }
}())
