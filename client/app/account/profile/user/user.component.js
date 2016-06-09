(function() {
    'use strict';

    angular
        .module('account.module')
        .component('user', {
            templateUrl: './app/account/profile/user/user.html',
            controller: 'UserCpntroller'
        });
}());
