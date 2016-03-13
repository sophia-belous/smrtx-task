(function() {
	'use strict';
	angular.module('smrtxApp').config(appConfig);
	
	function appConfig($stateProvider, $locationProvider, $urlRouterProvider, RestangularProvider) {
		RestangularProvider.setBaseUrl('/api');
                $stateProvider
                        .state('customers', {
                                url: '/',
                                templateUrl: 'views/customers/customer-list.html',
                                controller: 'CustomerController',
                                resolve: {
                                    customersData: function(Customer) {
                                        return Customer.getAll();
                                    }                           
                                }
                        })
                        .state('addCustomer', {
                                url: '/add',
                                templateUrl: 'views/customers/edit-customer.html',
                                controller: 'CustomerAddController'
                        })
                        .state('editCustomer', {
                                url: '/:customer_name/edit',
                                templateUrl: 'views/customers/edit-customer.html',
                                controller: 'CustomerEditController',
                                resolve: {
                                    customerData: function(Customer, $stateParams) {
                                        return Customer.getOne($stateParams.customer_name);
                                    }
                                }
                        })
                        .state('orders', {
                                url: '/:customer_name/orders',
                                templateUrl: 'views/orders/order-list.html',
                                controller: 'OrderController',
                                resolve: {
                                    ordersData: function(Order, $stateParams) {
                                        return Order.getAll($stateParams.customer_name);
                                    }
                                }
                        })
                        .state('addOrder', {
                                url: '/:customer_name/orders/add',
                                templateUrl: 'views/orders/edit-order.html',
                                controller: 'OrderAddController'
                        })
                        .state('editOrder', {
                                url: '/:customer_name/orders/:order_id/edit',
                                templateUrl: 'views/orders/edit-order.html',
                                controller: 'OrderEditController',
                                resolve: {
                                    orderData: function(Order, $stateParams) {
                                        return Order.getOne($stateParams.customer_name, $stateParams.order_id);
                                    }
                                }
                        });
                        $urlRouterProvider.otherwise('/');
                        $locationProvider.html5Mode(true);       
	}
})();