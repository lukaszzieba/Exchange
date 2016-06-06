(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .config(config)
        .run(run)

    config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

    function config($locationProvider, $stateProvider, $urlRouterProvider) {

        // For any unmatched url, redirect to /home
        $urlRouterProvider.otherwise("/home");

        $stateProvider
            .state('home', {
                url: "/home",
                template: '<home></home>',
                params: {
                    path: 'home'
                }
            })
            .state('currency', {
                url: "/currency",
                template: '<currency></currency>',
                params: {
                    path: 'currency'
                }
            });
    }

    run.$inject = ['$rootScope'];

    function run($rootScope) {

        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
        });
    }



}());
