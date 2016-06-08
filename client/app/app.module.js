(function() {
    'use strict';

    angular
        .module('exchangeApp', [
            // vendor
            'ui.router',
            'ngWebSocket',
            'angular-storage',
            'angular-jwt',
            'ngLodash',

            // dev
            'account.module'
        ]);

}());
