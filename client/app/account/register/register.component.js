(function() {
    'use strict';

    angular
        .module('account.module')
        .component('register', {
            templateUrl: './app/account/register/register.html',
            controller: 'RegisterController'
        });
}());
