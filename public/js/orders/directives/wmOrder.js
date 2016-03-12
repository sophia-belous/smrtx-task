(function() {
	'use strict';
	angular.module('order').directive('wmOrder', wmOrder);
	
	function wmOrder() {
		return {
			restrict: 'E',
			templateUrl: 'views/orders/order.html',
			scope: false,
			replace: true   
		};
	}
})();