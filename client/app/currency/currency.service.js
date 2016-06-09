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
