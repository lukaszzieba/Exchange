(function() {
    'use strict';

    angular
        .module('account.module')
        .component('accountNav', {
            templateUrl: './app/account/login/login.html',
            controller: 'LoginController'
        });
}());
