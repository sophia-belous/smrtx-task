(function() {
	'use strict';
	angular.module('customer').directive('wmCustomer', wmCustomer);
	
	function wmCustomer() {
		return {
			restrict: 'E',
			templateUrl: 'views/customers/customer.html',
			scope: false,
			replace: true 
		};
	}
})();