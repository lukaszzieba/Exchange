(function() {
    'use strict';

    angular
        .module('exchangeApp', [
            // vendor
            'ui.router',
            'ngWebSocket',
            
            // dev
            'account.module'
        ]);

}());
