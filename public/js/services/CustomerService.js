(function() {
    'use strict';
    angular.module('CustomerService', []).factory('Customer', ['$http', function($http) {
        return {
            get: function() {
                return $http.get('/api/customers');
            },
            create: function(customerData) {
                return $http.post('/api/customers', customerData);
            },
            delete: function(id) {
                return $http.delete('/api/customers/' + id);
            }
        };
    }]);    
})();