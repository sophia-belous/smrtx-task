(function() {
	'use strict';
	angular.module('smrtxApp').config('appConfig', appConfig);
	
	function appConfig($stateProvider, $locationProvider, RestangularProvider) {
		RestangularProvider.setBaseUrl('/api');
                $stateProvider
                        .state('customers', {
                                url: '/',
                                templateUrl: 'views/customers/customer-list.html',
                                controller: 'CustomerController'
                        })
                        .state('addCustomer', {
                                url: '/add',
                                templateUrl: 'views/customers/add-customer.html',
                                controller: 'CustomerAddController'
                        })
                        .state('editCustomer', {
                                url: '/:customer_name/edit',
                                templateUrl: 'views/customers/edit-customer.html',
                                controller: 'CustomerEditController'
                        })
                        .state('orders', {
                                url: '/:customer_name/orders',
                                templateUrl: 'views/customers/orders/order-list.html',
                                controller: 'OrderController'
                        })
                        .state('addOrder', {
                                url: '/:customer_name/orders/add',
                                templateUrl: 'views/customers/orders/add-order.html',
                                controller: 'OrderAddController'
                        })
                        .state('editOrder', {
                                url: '/:customer_name/orders/:order_id/edit',
                                templateUrl: 'views/customers/orders/edit-order.html',
                                controller: 'OrderEditController'
                        });
                $locationProvider.html5Mode(true);       
	}
})();