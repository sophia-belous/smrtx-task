(function() {
	'use strict';
	angular.module('order').controller('OrderController', OrderController);
	
	function OrderController($scope, $stateParams, $mdDialog, Order) {
		 $scope.testline = 'It is customer controller line!'
		
		$scope.orders = [];      
		$scope.customerName =  $stateParams.customer_name; 

		Order.getAll($stateParams.customer_name).then(function(orders) {
			$scope.orders = orders.plain();
		});        
		
		$scope.deleteOrder = function(orderId, index, event) {
			var confirm = $mdDialog.confirm()
				.title('Would you like to delete this order?')
				.targetEvent(event)
				.ok('Yeah!')
				.cancel('Nope');
				
			$mdDialog.show(confirm)
				.then(function() {
					Order.remove($scope.customerName, orderId);
					$scope.orders.splice(index, 1);
				}, function() {
					$scope.status = 'You decided to keep your order.';
				});
		}
	}
})();