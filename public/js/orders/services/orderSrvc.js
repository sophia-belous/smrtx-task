(function() {
	'use strict';
	angular.module('order').factory('Order', Order);
	
	function Order(ConfiguredRestangular) {
		function Orders(customerName) {
			return ConfiguredRestangular.one('customers', customerName).all('orders');
		}
		
		return {
			getOne: getOne,
			getAll: getAll,
			add: add,
			update: update,
			remove: remove
		};
		
		function getOne(customerName, orderId) {
			return ConfiguredRestangular.one('customers', customerName).one('orders', orderId).get();
		}
		
		function getAll(customerName) {
			return Orders(customerName).getList();
		}		
		
		function add(customerName, orderData) {
			return Orders(customerName).post(orderData);
		}
		
		function update(customerName, orderId, orderData) {
			return Orders(customerName).one(orderId).customPUT(orderData);
		}
		
		function remove(customerName, orderId) {
			return Orders(customerName).one(orderId).remove();
		} 
	}
})();