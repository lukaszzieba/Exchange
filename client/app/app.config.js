(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .config(config)
        .run(run)

    config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider', 'jwtInterceptorProvider', '$httpProvider'];

    function config($locationProvider, $stateProvider, $urlRouterProvider, jwtInterceptorProvider, $httpProvider) {

        // for any unmatched url, redirect to /home
        $urlRouterProvider.otherwise("/home");

        // states in exchangeApp
        $stateProvider
            .state('home', {
                url: "/home",
                template: '<home></home>'
            })
            .state('currency', {
                url: "/currency",
                template: '<currency></currency>'
            })
            .state('register', {
                url: "/register",
                template: '<register></register>',
                data: {
                    notAllowLogedInUsers: true
                }
            })
            .state('exchange', {
                url: "/exchange",
                template: '<exchange></exchange>',
                data: {
                    requireLogin: true
                }
            })
            .state('profile', {
                url: "/profile",
                template: '<profile></profile>',
                data: {
                    requireLogin: true
                }
            })
            .state('profile.main', {
                url: "/main",
                template: '<main></main>',
                data: {
                    requireLogin: true
                }
            })
            .state('profile.user', {
                url: "/user",
                template: '<user></user>',
                data: {
                    requireLogin: true
                }
            })
            .state('profile.wallet', {
                url: "/wallet",
                template: '<define-wallet></define-wallet>',
                data: {
                    requireLogin: true
                }
            });


        // jwt interceptor gets token fom local storage and send to server with any request
        jwtInterceptorProvider.tokenGetter = function(store) {
            return store.get('jwt');
        }

        // add jwt interceptor to http interceptors
        $httpProvider.interceptors.push('jwtInterceptor');
    }

    run.$inject = ['$rootScope', '$state', 'store'];

    function run($rootScope, $state, store) {

        // prvent unauthenticated user go to excahnge
        $rootScope.$on('$stateChangeStart', function(e, to) {
            var jwt = store.get('jwt');
            if (to.data && to.data.requireLogin) {
                if (!jwt) {
                    e.preventDefault();
                    $state.go('home');
                }
            }
            if (to.data && to.data.notAllowLogedInUsers) {
                if (jwt) {
                    e.preventDefault();
                    $state.go('exchange');
                }
            }
        });

        // set currentState on $rootScope fot shell nav active class
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            $rootScope.currentState = toState.name;
        });
    }
}());
