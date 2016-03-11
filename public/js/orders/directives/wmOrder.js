(function() {
	'use strict';
	angular.module('order').directive('wmOrder', wmOrder);
	
	function wmOrder() {
		return {
			restrict: 'E',
			templateUrl: 'views/customers/customer.html',
			scope: false,
			replace: true   
		};
	}
})();