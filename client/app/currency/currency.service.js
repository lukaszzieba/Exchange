(function() {
    'use strict';

    angular
        .module('exchangeApp')
        .factory('CurrencyService', CurrencyService);
    CurrencyService.$inject = ['$http', '$websocket'];

    function CurrencyService($http, $websocket) {

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
