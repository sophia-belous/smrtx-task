(function() {
	'use strict';
	angular.module('order').controller('OrderAddController', OrderAddController);
	
	function OrderAddController($scope, $state, $stateParams, Order) {
		$scope.order = {};
			
		$scope.addOrder = function() {
			Order.add($stateParams.customer_name, $scope.order).then(function() {
				$state.go('orders', {customer_name: $stateParams.customer_name});
			});         
		};    
	}
})();