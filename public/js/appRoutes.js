(function() {
    'use strict';
    angular.module('appRoutes', []).config(appConfig);

    function appConfig($stateProvider, $urlRouterProvider, $locationProvider) {
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'views/home.html',
                controller: 'MainController'
            })
            .state('customers', {
                url: '/customers',
                templateUrl: 'views/customers.html',
                controller: 'CustomerController'
            });
        $locationProvider.html5Mode(true);
    }
})();