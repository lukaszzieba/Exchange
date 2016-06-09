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
            if (vm.userWallet.wallet[0].ammount < $scope.toPay) {
                $("#buyDialog").modal("hide");
                $("#confirmDialog").modal("hide");
                clearBuyData();
                ToastrService.showToastr(false, 'You dont have enough money')
                return;
            }
            $("#buyDialog").removeClass("fade").modal("hide");
            $("#confirmDialog").modal("show").addClass("fade");
        };

        vm.buyConfirm = function() {
            var buyData = {
                code: vm.cur.Code,
                ammount: $scope.ammount,
                toPay: $scope.toPay
            }
            clearBuyData();
            BuyService.buy(buyData)
                .then(function(wallet) {
                    WalletService.wallet = wallet;
                }, function() {

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
