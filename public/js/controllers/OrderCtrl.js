(function() {
    'use strict';
    angular.module('OrderCtrl', []).controller('OrderController', OrderController);
     
    function OrderController($scope, $stateParams, Customer) {
        $scope.testline = 'It is customer controller line!'
        
        $scope.orders = [];        

        Customer.getOrders($stateParams.customer_name, function(orders) {
            $scope.orders = orders.plain();
            console.log($scope.orders);
        });        
    }
})();