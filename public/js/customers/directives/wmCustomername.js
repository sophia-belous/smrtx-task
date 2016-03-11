(function() {
	'use strict';
	angular.module('customer').directive('wmCustomername', wmCustomername);
	
	function wmCustomername($q, $timeout, Customer) {
		return {
			restrict: 'A',
			require: 'ngModel',             
			link: function(scope, elm, attrs, ngModel) {
				ngModel.$asyncValidators.customername = function(modelValue) {
					var def = $q.defer();   
					$timeout(function() {
						Customer.getOne(modelValue).then(function(customer) {
							if(scope.initialCustomerName) {
								if (customer == null || scope.initialCustomerName == customer.name) def.resolve();
								else def.reject();
							} else {
								if (customer == null) def.resolve();
								else def.reject();    
							}
						});
					}, 2000);
					return def.promise;                       
				};
			}
		};
	}
})();