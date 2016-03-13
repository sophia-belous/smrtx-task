(function() {
	'use strict';
	angular.module('customer').controller('CustomerController', CustomerController);
	
	function CustomerController($scope, $mdDialog, Customer, $state, customersData) {

        $scope.customers = customersData.plain();		
		
		$scope.deleteCustomer = function(customerName, index, event) {
			var confirm = $mdDialog.confirm()
				.title('Would you like to delete ' + customerName + '?')
				.textContent('All orders of this customer will also be removed.')
				.targetEvent(event)
				.ok('Yeah!')
				.cancel('Nope');
				
			$mdDialog.show(confirm)
				.then(function() {
					Customer.remove(customerName);
					$state.reload();
				}, function() {
					$scope.status = 'You decided to keep your debt.';
				});
		}
	}
})();