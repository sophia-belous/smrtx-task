(function() {
    'use strict';
    angular.module('OrderCtrl', [])
        .controller('OrderController', OrderController)
        .controller('OrderAddController', OrderAddController)
        .controller('OrderEditController', OrderEditController);
     
        function OrderController($scope, $stateParams, $mdDialog, Customer) {
            $scope.testline = 'It is customer controller line!'
            
            $scope.orders = [];      
            $scope.customerName =  $stateParams.customer_name; 

            Customer.getOrders($stateParams.customer_name, function(orders) {
                $scope.orders = orders.plain();
                console.log($scope.orders);
            });        
            
            $scope.deleteOrder = function(orderId, index, event) {
                var confirm = $mdDialog.confirm()
                    .title('Would you like to delete this order?')
                    .targetEvent(event)
                    .ok('Yeah!')
                    .cancel('Nope');
                    
                $mdDialog.show(confirm)
                    .then(function() {
                        Customer.removeOrder($scope.customerName, orderId);
                        $scope.orders.splice(index, 1);
                    }, function() {
                        $scope.status = 'You decided to keep your order.';
                    });
            }
        }
        
        function OrderEditController($scope, $state, $stateParams, Customer) {
            $scope.order = {};
            Customer.getOneOrder($stateParams.customer_name, $stateParams.order_id, function(order) {
                $scope.order = order;
                
                $scope.updateOrder = function() {
                    Customer.updateOrder($stateParams.customer_name, $stateParams.order_id, $scope.order, function() {
                        $state.go('orders', {customer_name: $stateParams.customer_name});
                    });         
                };   
            });                                             
        }
            
        function OrderAddController($scope, $state, $stateParams, Customer) {
            $scope.order = {};
                
            $scope.addOrder = function() {
                Customer.addOrder($stateParams.customer_name, $scope.order, function() {
                    $state.go('orders', {customer_name: $stateParams.customer_name});
                });         
            };     
        }
})();