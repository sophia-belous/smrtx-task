(function() {
	'use strict';
	angular.module('customer')
		.factory('Customer', Customer);

	function Customer(ConfiguredRestangular) {
		var Customers = ConfiguredRestangular.all('customers');
		return {
			getOne: getOne,
			getAll: getAll,
			add: add,
			update: update,
			remove: remove,
			uploadLogo: uploadLogo
		};
		
		function getOne(customerName) {
			return ConfiguredRestangular.one('customers', customerName).get();
		}
		
		function getAll() {
			return Customers.getList();
		}
		
		function add(customerData) {
			return Customers.post(customerData);
		}
	
		function update(customerName, customerData) {
			return ConfiguredRestangular.one('customers', customerName).customPUT(customerData);
		}
		
		function remove(customerName) {
			return ConfiguredRestangular.one('customers', customerName).remove();
		}
		           
		function uploadLogo(file, customerName) {
			var formData = new FormData();
			formData.append('file', file);
			
			return ConfiguredRestangular.one('customers', customerName).all('uploads')
				.withHttpConfig({transformRequest: angular.identity})
				.customPOST(formData, undefined, undefined, {'Content-Type': undefined });
		}
	}
})();