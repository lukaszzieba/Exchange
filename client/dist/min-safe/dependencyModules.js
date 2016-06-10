(function() {
    'use strict';

    angular
        .module('account.module', [
            // vendor
            'ui.router',
            'angular-storage',
            'angular-jwt',
            'toastr'
        ]);
}());

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

(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('IdentyService', IdentyService);
    IdentyService.$inject = ['store', 'jwtHelper']

    function IdentyService(store, jwtHelper) {
        // curr user
        var currentUser = getDecodedToken();

        // decoding tojen
        function getDecodedToken() {
            var token = store.get('jwt');
            var tokenPayload = {};
            if (token) {
                tokenPayload = jwtHelper.decodeToken(token);
            }
            return tokenPayload;
        }

        return {
            currentUser: currentUser,
            getDecodedToken: getDecodedToken,
            isAuthenticated: isAuthenticated
        }

        // is user authenticate
        function isAuthenticated() {
            if (this.currentUser === undefined || !this.currentUser.hasOwnProperty('email')) {
                return false;
            } else {
                return currentUser;
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .component('accountNav', {
            templateUrl: './app/account/login/login.html',
            controller: 'LoginController'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', 'LoginService', 'store', '$state', 'IdentyService'];

    function LoginController($scope, LoginService, store, $state, IdentyService) {
        var vm = this;
        vm.userData = {}
        vm.identy = IdentyService;

        // login
        vm.login = function(userData) {
            $scope.login_form.submitted = false;

            if ($scope.login_form.$valid) {
                LoginService.login(userData)
                    .then(function(response) {
                        if (response.data && response.data.success) {
                            store.set('jwt', response.data.id_token);
                            var t = IdentyService.getDecodedToken();
                            IdentyService.currentUser = t;
                            $state.go('exchange');
                            vm.userData = {}
                        }
                    }, function(err) {
                        console.log(err);
                    });
            } else {
                $scope.login_form.submitted = true;
            }
        }

        // logout
        vm.logOut = function() {
            LoginService.signOut();
            IdentyService.currentUser = undefined;
            $state.go('home');
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('LoginService', LoginService);

    LoginService.$inject = ['$http', 'store', 'IdentyService', 'ToastrService'];

    function LoginService($http, store, IdentyService, ToastrService) {
        return {
            login: login,
            signOut: signOut
        }

        function login(user) {
            return $http({
                    url: '/login',
                    method: 'POST',
                    data: user
                })
                .then(loginSuccess, loginFail);

            function loginSuccess(respone) {
                ToastrService.showToastr(true, respone.data.msg);
                return respone;
            }

            function loginFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }

        function signOut() {
            ToastrService.showToastr(true, 'User loged out.');
            store.remove('jwt');
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .component('defineWallet', {
            templateUrl: './app/account/profile/defineWallet/defineWallet.html',
            controller: 'DefineWalletController'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('DefineWalletController', DefineWalletController);

    DefineWalletController.$inject = ['DefineWalletService', '$scope'];

    function DefineWalletController(DefineWalletService, $scope) {
        var vm = this;
        vm.profile;

        activate();

        function activate() {
            return getProfile()
                .then(function() {
                    console.log('Activate proflie');
                });
        }

        function getProfile() {
            return DefineWalletService.getFullProfile()
                .then(function(data) {
                    vm.profile = data;
                    return vm.profile;
                });
        }

        vm.saveWallet = function() {
            $scope.define_wallet.submitted = false;

            if ($scope.define_wallet.$valid) {
                DefineWalletService.saveWallet(vm.profile.wallet)
                    .then(function(data) {
                        console.log(data);
                    });
            }
        };
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('DefineWalletService', DefineWalletService);

    DefineWalletService.$inject = ['$http'];

    function DefineWalletService($http) {
        return {
            getFullProfile: getFullProfile,
            saveWallet: saveWallet
        }

        function getFullProfile() {
            return $http.get('/api/protected/user')
                .then(getProflileSuccess, getProflileFail);

            function getProflileSuccess(response) {
                return response.data;
            }

            function getProflileFail() {
                console.log('XHR Failed for getFullProfile.');
            }
        }

        function saveWallet(wallet) {
            return $http.put('/api/protected/wallet', wallet)
                .then(updateWalletSuccess, updateWalletFail);

            function updateWalletSuccess(response) {
                return response.data;
            }

            function updateWalletFail() {
                console.log('XHR Failed for getFullProfile.');
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .component('main', {
            templateUrl: './app/account/profile/main/main.html',
        });
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .component('profile', {
            templateUrl: './app/account/profile/profile.html',
            controller: 'ProflieController'
        });
}());

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
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .component('user', {
            templateUrl: './app/account/profile/user/user.html',
            controller: 'UserCpntroller'
        });
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .controller('UserCpntroller', UserCpntroller);

    UserCpntroller.$inject = ['$scope', 'UserService'];

    function UserCpntroller($scope, UserService) {
        $scope.updateUser = {};

        $scope.signupForm = function(user) {
            $scope.update_form.submitted = false;

            if ($scope.update_form.$valid) {
                UserService.updateUser(user)
                    .then(function() {
                        $scope.updateUser = user;
                    })

            } else {
                $scope.update_form.submitted = true;
            }
        };

        activate();

        function activate() {
            return getUser()
                .then(function() {
                    console.log('Update user active');
                });
        }

        function getUser() {
            return UserService.getUser()
                .then(function(data) {
                    $scope.updateUser = data;
                    return $scope.updateUser;
                });
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('UserService', UserService);

    UserService.$inject = ['$http']

    function UserService($http) {
        return {
            getUser: getUser,
            updateUser: updateUser
        }

        function getUser() {
            return $http.get('/api/protected/user')
                .then(getUserSuccuess, getUserFali);

            function getUserSuccuess(responese) {
                return responese.data;
            }

            function getUserFali() {
                console.log('XHR Failed for getUser.');
            }
        }

        function updateUser(user) {
            return $http.put('/api/protected/user', user)
                .then(updateUserSuccuess, updateUserFali);

            function updateUserSuccuess(responese) {
                return responese.data;
            }

            function updateUserFali() {
                console.log('XHR Failed for updateUser.');
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .component('register', {
            templateUrl: './app/account/register/register.html',
            controller: 'RegisterController'
        });
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$scope', 'RegisterService', 'store', 'IdentyService', '$state'];

    function RegisterController($scope, RegisterService, store, IdentyService, $state) {

        $scope.signupForm = function(newUser) {
            $scope.signup_form.submitted = false;

            if ($scope.signup_form.$valid) {
                // Submit
                RegisterService.registerUser(newUser).
                then(function(response) {
                    if (response.data && response.data.success) {
                        store.set('jwt', response.data.id_token);
                        var t = IdentyService.getDecodedToken();
                        IdentyService.currentUser = t;
                        $state.go('exchange');
                    }
                }, function(err) {
                    console.log(err);
                });
            } else {
                $scope.signup_form.submitted = true;
            }
        };
    }
}());

(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('RegisterService', RegisterService);

    RegisterService.$inject = ['$http', 'ToastrService'];

    function RegisterService($http, ToastrService) {
        return {
            registerUser: registerUser
        }

        function registerUser(user) {
            return $http({
                url: '/register',
                method: 'POST',
                data: user
            }).then(registerSuccess, registerFail)

            function registerSuccess(respone) {
                ToastrService.showToastr(true, respone.data.msg);
                return respone;
            }

            function registerFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('BuyService', BuyService);
        
    BuyService.$inject = ['$http', 'ToastrService']

    function BuyService($http, ToastrService) {
        return {
            buy: buy
        }

        function buy(buyData) {
            return $http.put('/api/protected/buy', buyData)
                .then(buySuccess, buyFail);

            function buySuccess(responese) {
                return responese.data;
            }

            function buyFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('currency', {
            bindingd: {},
            templateUrl: './app/currency/currency.html',
            controller: 'CurrencyController'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('CurrencyController', CurrencyController);
    CurrencyController.$inject = ['CurrencyService', 'WalletService', 'BuyService', '$scope', '$rootScope', 'IdentyService', 'ToastrService', '$http', '$filter'];

    function CurrencyController(CurrencyService, WalletService, BuyService, $scope, $rootScope, IdentyService, ToastrService, $http, $filter) {
        var vm = this;
        vm.currencies = [];
        vm.currencies = CurrencyService;
        vm.userWallet = WalletService;

        // show/hide buy button
        vm.showAction = function() {
            return IdentyService.isAuthenticated() && $rootScope.currentState === 'exchange';
        };

        // for buing currency
        vm.cur = {};
        $scope.ammount = 0;
        $scope.toPay = 0;
        var p;
        vm.buy = function(currency) {
            vm.cur = currency;
            $("#buyDialog").modal("show");
        };

        $scope.$watch('ammount', function() {
            $scope.toPay = ($scope.ammount / vm.cur.Unit) * vm.cur.PurchasePrice;
        });


        vm.buySubmit = function(currency) {
            if ($scope.ammount !== 0 && $scope.toPay !== 0) {
                if (vm.userWallet.wallet[0].ammount < $scope.toPay) {
                    $("#buyDialog").modal("hide");
                    $("#confirmDialog").modal("hide");
                    clearBuyData();
                    ToastrService.showToastr(false, 'You dont have enough money')
                    return;
                }
                $("#buyDialog").removeClass("fade").modal("hide");
                $("#confirmDialog").modal("show").addClass("fade");
            }
        };

        vm.buyConfirm = function() {
            var buyData = {
                code: vm.cur.Code,
                ammount: $scope.ammount,
                toPay: $scope.toPay
            }
            clearBuyData();
            BuyService.buy(buyData)
                .then(function(data) {
                    if (data.success) {
                        WalletService.wallet = data.wallet;
                    }
                }, function(err) {
                    console.log('Buy fail');
                })
            $("#confirmDialog").modal("hide");
        }

        vm.cancelBuy = function() {
            $("#buyDialog").modal("hide");
            $("#confirmDialog").modal("hide");
            clearBuyData();
        };

        function clearBuyData() {
            vm.cur = {};
            $scope.ammount = 0;
            $scope.toPay = 0;
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('CurrencyService', CurrencyService);
    CurrencyService.$inject = ['$http', '$websocket', 'lodash'];

    function CurrencyService($http, $websocket, lodash) {

        // Open a WebSocket connection
        var dataStream = $websocket('ws://webtask.future-processing.com:8068/ws/currencies');

        var collection = [];
        var forGraph = [];

        dataStream.onOpen(function() {
            console.log('Connected to ws');
        });

        dataStream.onMessage(function(message) {
            if (collection.length !== 0) {
                collection.splice(0, 1);
            }
            collection.push(JSON.parse(message.data));
        });

        function getCurrencies() {
            dataStream.send(JSON.stringify({
                action: 'get'
            }));
        }

        return {
            collection: collection,
            forGraph: forGraph,
            getCurrencies: getCurrencies
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('exchange', {
            templateUrl: './app/exchange/exchange.html',
            controller: 'ExchangeController'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('ExchangeController', ExchangeController);

    function ExchangeController() {
        var vm = this;      
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('home', {
            templateUrl: './app/home/home.html'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('foot', {
            templateUrl: './app/shell/foot/foot.html'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('navBar', {
            templateUrl: './app/shell/nav/nav.html',
            controller: 'NavController'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('NavController', NavController);

    NavController.$inject = ['$rootScope', '$scope', 'IdentyService'];

    function NavController($rootScope, $scope, IdentyService) {
        var vm = this;
        vm.isActive = function(state) {
            return state === $rootScope.currentState;
        }
        vm.identy = IdentyService;        
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('shell', {
            templateUrl: './app/shell/shell.html'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('ToastrService', ToastrService);
    ToastrService.$inject = ['toastr']

    function ToastrService(toastr) {

        return {
            showToastr: showToastr
        }

        // show toastr depand on success ture/fale
        function showToastr(success, msg) {
            if (success) {
                toastr.success(msg, 'Success');
            } else {
                toastr.error(msg, 'Error');
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('SellService', SellService);

    SellService.$inject = ['$http', 'ToastrService'];

    function SellService($http, ToastrService) {
        return {
            sell: sell
        }

        function sell(sellData) {
            return $http.put('/api/protected/sell', sellData)
                .then(sellSuccess, sellFail);

            function sellSuccess(responese) {
                return responese.data;
            }

            function sellFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .component('wallet', {
            templateUrl: './app/wallet/wallet.html',
            controller: 'WalletController'
        });
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .controller('WalletController', WalletController);
    WalletController.$inject = ['WalletService', 'CurrencyService', 'SellService', 'ToastrService', '$scope'];

    function WalletController(WalletService, CurrencyService, SellService, ToastrService, $scope) {
        var vm = this;
        vm.userWallet = WalletService;
        vm.currencies = CurrencyService.collection;
        activate();

        function activate() {
            return getWallet()
                .then(function() {
                    console.log('Activate wallet');
                });
        }

        function getWallet() {
            return WalletService.getWallet()
                .then(function(data) {
                    if (data.success) {
                        vm.userWallet = data.wallet;
                        return vm.wallet;
                    }
                });
        }

        // getting current sell price
        vm.getUintPrice = function(cur) {
            var price = 0;
            if (vm.currencies.length !== 0 && vm.currencies[0].Items !== undefined) {
                vm.currencies[0].Items.forEach(function(item) {
                    if (item.Code === cur.code) {
                        price = item.SellPrice;
                    }
                });
            }
            return price;
        };

        // geting value
        vm.getValue = function(cur) {
            var unitPrice = vm.getUintPrice(cur);
            return (cur.ammount / cur.unit) * unitPrice;
        };

        // for sell
        vm.cur = {};
        $scope.youHave = 0;
        $scope.ammount = 0;
        $scope.toGet = 0;

        vm.sell = function(currency) {
            $scope.youHave = currency.ammount;
            vm.cur = currency;
            $('#sellDialog').modal('show');
        };

        function getAmmount() {
            var money;
            vm.userWallet.wallet.forEach(function(item) {
                if (item.code === vm.cur.code) {
                    console.log(item);
                    money = item.ammount;
                }
            });
            return money;
        }

        vm.sellSubmit = function() {
            var have = getAmmount();
            if ($scope.ammount === undefined) {
                ToastrService.showToastr(false, 'You dont have enough money')
                return;
            }

            if ($scope.ammount !== 0) {
                $("#sellDialog").removeClass("fade").modal("hide");
                $("#sellConfirmDialog").modal("show").addClass("fade");
            }
        }

        $scope.$watch('ammount', function(newVal) {
            $scope.toGet = ($scope.ammount / vm.cur.unit) * vm.getUintPrice(vm.cur);
            $scope.youHave = vm.cur.ammount - newVal;
            if($scope.youHave === NaN) {
              $scope.youHave = 0;
            }
        });

        vm.sellConfirm = function(currency) {
            var sellData = {
                code: vm.cur.code,
                sellUnits: $scope.ammount,
                toGet: $scope.toGet
            }
            clearSellData();
            SellService.sell(sellData)
                .then(function(data) {
                    if (data.success) {
                        WalletService.wallet = data.wallet;
                    }
                }, function() {
                    console.log('Error');
                })
            $('#sellConfirmDialog').modal('hide');
        };

        vm.cancelSell = function() {
            $('#sellDialog').modal('hide');
            $('#sellConfirmDialog').modal('hide');
            clearSellData();
        };

        function clearSellData() {
            vm.cur = {};
            $scope.youHave = 0;
            $scope.ammount = 0;
            $scope.toGet = 0;
        }

        $('#sellModal').on('hide.bs.modal', function(event) {
            clearSellData();
        });
    }
}());

(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('WalletService', WalletService);

    WalletService.$inject = ['$http', 'ToastrService'];

    function WalletService($http, ToastrService) {
        var wallet;
        return {
            wallet: wallet,
            getWallet: getWallet
        };

        function getWallet() {
            var self = this;

            return $http.get('/api/protected/wallet')
                .then(walletSuccess, walletFail);

            function walletSuccess(response) {
                self.wallet = response.data;
                return response.data;
            }

            function walletFail(err) {
                ToastrService.showToastr(false, err.data.msg)
                return err;
            }
        }
    }
}());
