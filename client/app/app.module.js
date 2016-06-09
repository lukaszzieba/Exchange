(function() {
    'use strict';

    angular
        .module('exchangeApp', [
            // vendor
            'ui.router',
            'ngWebSocket',
            'angular-storage',
            'angular-jwt',
            'ngAnimate',
            'toastr',
            'ngLodash',


            // dev
            'account.module'
        ]);

}());
