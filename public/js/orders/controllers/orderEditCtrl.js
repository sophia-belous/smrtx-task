(function() {
	'use strict';
	angular.module('order').controller('OrderEditController', OrderEditController);
	
	function OrderEditController($scope, $state, $stateParams, Order, orderData) {
		$scope.order = {};
        $scope.order = orderData;
        
        $scope.updateOrder = function() {
            Order.update($stateParams.customer_name, $stateParams.order_id, $scope.order).then(function() {
                $state.go('orders', {customer_name: $stateParams.customer_name});
            });          
        };   
        
        $scope.goBack = function() {
            $state.go('orders', {customer_name: $stateParams.customer_name});
        };    
	}
})();