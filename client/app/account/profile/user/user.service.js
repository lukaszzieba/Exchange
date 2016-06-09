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
