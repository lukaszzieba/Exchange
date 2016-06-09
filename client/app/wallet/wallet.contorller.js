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
