(function() {
	'use strict';
	angular.module('customer').controller('CustomerAddController', CustomerAddController);
	
	function CustomerAddController($scope, $state, $stateParams, Customer) {
		$scope.customer = {};
			
		$scope.updateCustomer = function(photoFile) {       
			Customer.add($scope.customer).then(function() {
				Customer.uploadLogo(photoFile, $scope.customer.name).then(function() {
					$state.go('customers');                        
				});
				
			});         
		};   
	}
})();