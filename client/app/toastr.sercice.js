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

        function showToastr(success, msg) {
            if (success) {
                toastr.success(msg, 'Success');
            } else {
                toastr.error(msg, 'Error');
            }
        }

    }
}());
