(function() {
    'use strict';
    angular.module('MainCtrl', []).controller('MainController', MainController);
    
    function MainController($scope, Customer) {
        $scope.addCustomer = function() {
            Customer.add(function(customer) {
                console.log(customer);
            });
        };
    }    
})();