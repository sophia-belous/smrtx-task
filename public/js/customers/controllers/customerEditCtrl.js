(function() {
	'use strict';
	angular.module('customer').controller('CustomerEditController', CustomerEditController);
	
	function CustomerEditController($scope, $state, $stateParams, Customer, customerData) {
		$scope.formMode = 'edit';
		$scope.initialCustomerName = $stateParams.customer_name;
        $scope.customer = customerData;
        
        $scope.updateCustomer = function() {
            Customer.update($stateParams.customer_name, $scope.customer).then(function() {
                $state.go('customers');
            });         
        };   
	}
})();