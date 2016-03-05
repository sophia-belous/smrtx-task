(function() {
    'use strict';
    angular.module('CustomerCtrl', []).controller('CustomerController', CustomerController);
     
    function CustomerController($scope) {
        $scope.testline = 'It is customer controller line!'
    }
})();