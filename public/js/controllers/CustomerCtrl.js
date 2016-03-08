(function() {
    'use strict';
    angular.module('CustomerCtrl', [])
        .controller('CustomerController', CustomerController)
        .controller('CustomerAddController', CustomerAddController)
        .controller('CustomerEditController', CustomerEditController)
        ;
     
        function CustomerController($scope, $mdDialog, Customer) {
            Customer.getAll(function(customers) {
                $scope.customers = customers.plain();
                console.log($scope.customers);
            });
            
            $scope.customers = [];    
            
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
                        $scope.customers.splice(index, 1);
                    }, function() {
                        $scope.status = 'You decided to keep your debt.';
                    });
            }
        }
        
        function CustomerEditController($scope, $state, $stateParams, Customer) {
            $scope.customer = {};
            Customer.getOne($stateParams.customer_name, function(customer) {
                $scope.customer = customer;
                
                $scope.updateCustomer = function() {
                    Customer.update($stateParams.customer_name, $scope.customer, function() {
                        $state.go('customers');
                    });         
                };   
            });                                             
        }
        
        function CustomerAddController($scope, $state, $stateParams, Customer) {
            $scope.customer = {};
                
            $scope.addCustomer = function() {
                Customer.add($scope.customer, function() {
                    $state.go('customers');
                });         
            };     
        }
})();