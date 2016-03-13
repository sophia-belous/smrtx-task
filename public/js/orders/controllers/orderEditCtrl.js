(function() {
	'use strict';
	angular.module('order').controller('OrderEditController', OrderEditController);
	
	function OrderEditController($scope, $state, $stateParams, Order) {
		$scope.order = {};
		Order.getOne($stateParams.customer_name, $stateParams.order_id).then(function(order) {
			$scope.order = order;
			
			$scope.updateOrder = function() {
				Order.update($stateParams.customer_name, $stateParams.order_id, $scope.order).then(function() {
					$state.go('orders', {customer_name: $stateParams.customer_name});
				});
                
            $scope.goBack = function() {
                $state.go('orders', {customer_name: $stateParams.customer_name});
            };             
			};   
		});     
	}
})();