(function() {
    angular.module('appDirectives', [])
        .directive('wmCustomer', wmCustomer)
        .directive('wmOrder', wmOrder)
        ;
        
        function wmCustomer() {
            return {
                restrict: 'E',
                templateUrl: 'views/customer.html',
                scope: false,
                replace: true             
            };
        }
        
        function wmOrder() {
            return {
                restrict: 'E',
                templateUrl: 'views/order.html',
                scope: false,
                replace: true             
            };
        }
})();