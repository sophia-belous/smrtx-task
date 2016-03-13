(function() {
	'use strict';
	angular.module('order').controller('OrderController', OrderController);
	
	function OrderController($scope, $stateParams, $mdDialog, Order, ordersData) {
        $scope.orders = ordersData.plain();
		$scope.customerName = $stateParams.customer_name; 
            
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