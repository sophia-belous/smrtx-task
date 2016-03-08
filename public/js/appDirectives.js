(function() {
    angular.module('appDirectives', [])
        .directive('wmCustomer', wmCustomer)
        .directive('wmOrder', wmOrder)
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
})();