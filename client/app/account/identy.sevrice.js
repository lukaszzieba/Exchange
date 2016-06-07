(function() {
    'use strict';

    angular
        .module('account.module')
        .factory('IdentyService', IdentyService);
    IdentyService.$inject = ['store', 'jwtHelper']

    function IdentyService(store, jwtHelper) {
        var currentUser = getDecodedToken();

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

        function isAuthenticated() {
            if (this.currentUser === undefined || !this.currentUser.hasOwnProperty('email')) {
                return false;
            } else {
                return currentUser;
            }
        }
    }

}());
