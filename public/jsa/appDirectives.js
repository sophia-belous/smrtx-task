(function() {
    angular.module('appDirectives', [])
        .directive('wmCustomer', wmCustomer)
        .directive('wmOrder', wmOrder)
        .directive('wmCustomername', wmCustomername)
        ;
        
        function wmCustomer() {
            return {
                restrict: 'E',
                templateUrl: 'views/customers/customer.html',
                scope: false,
                replace: true             
            };
        }
        
        function wmOrder() {
            return {
                restrict: 'E',
                templateUrl: 'views/customers/orders/order.html',
                scope: false,
                replace: true             
            };
        }
        
        function wmCustomername($q, $timeout, Customer) {
            return {
                restrict: 'A',
                require: 'ngModel',             
                link: function(scope, elm, attrs, ngModel) {
                    ngModel.$asyncValidators.customername = function(modelValue) {
                        var def = $q.defer();   
                        $timeout(function() {
                            Customer.getOne(modelValue, function(customer) {
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