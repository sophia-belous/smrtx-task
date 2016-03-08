(function() {
    'use strict';
    angular.module('appRoutes', []).config(appConfig);

    function appConfig($stateProvider, $locationProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
        $stateProvider
            .state('customers', {
                url: '/',
                templateUrl: 'views/customers.html',
                controller: 'CustomerController'
            })
            .state('customers/edit', {
                url: '/:customer_name/edit',
                templateUrl: 'views/edit.html',
                controller: 'CustomerEditController'
            })
            .state('orders', {
                url: '/:customer_name/orders',
                templateUrl: 'views/orders.html',
                controller: 'OrderController'
            })            
            ;
        $locationProvider.html5Mode(true);
    }
})();