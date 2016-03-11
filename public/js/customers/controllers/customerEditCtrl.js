(function() {
	'use strict';
	angular.module('customer').controller('CustomerEditController', CustomerEditController);
	
	function CustomerEditController($scope, $state, $stateParams, Customer) {
		$scope.formMode = 'edit';
		$scope.initialCustomerName = $stateParams.customer_name;
		$scope.customer = {};
		Customer.getOne($stateParams.customer_name).then(function(customer) {
			$scope.customer = customer;
			
			$scope.updateCustomer = function() {
				Customer.update($stateParams.customer_name, $scope.customer).then(function() {
					$state.go('customers');
				});         
			};   
		});      
	}
})();