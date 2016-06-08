(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('CurrencyService', CurrencyService);
    CurrencyService.$inject = ['$http', '$websocket'];

    function CurrencyService($http, $websocket) {
        // Data form static file

        // return {
        //     getCurrencies: getCurrencies
        // };
        //
        // function getCurrencies() {
        //     return $http.get('./app/currency/data.json')
        //         .then(getCurrenciesComplete)
        //         .catch(getCurrenciesFiled);
        //
        //     function getCurrenciesComplete(responese) {
        //         return responese.data;
        //     }
        //
        //     function getCurrenciesFiled() {
        //         console.log('XHR Failed for getCurrencies.');
        //     }
        // }

        //Data form WebSocket

        // Open a WebSocket connection
        var dataStream = $websocket('ws://webtask.future-processing.com:8068/ws/currencies');

        var collection = [];

        dataStream.onOpen(function() {
            // console.log('Connected to ws');
        });

        dataStream.onMessage(function(message) {
            // console.log(message);
            if (collection.length !== 0) {
                collection.splice(0, 1);
                // console.log('DELETE');
            }
            collection.push(JSON.parse(message.data));
            // console.log(collection);
            // for graph
            // collection.push(JSON.parse(message.data));
        });

        function getCurrencies() {
            dataStream.send(JSON.stringify({
                action: 'get'
            }));
        }

        return {
            collection: collection,
            getCurrencies: getCurrencies
        }
    }
}());

// $http.get('webtask.future-processing.com:8068/currencies', {
//         headers: {
//           'Accept' : 'application/json'
//         }
//     })
