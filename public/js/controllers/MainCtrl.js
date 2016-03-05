(function() {
    'use strict';
    angular.module('MainCtrl', []).controller('MainController', MainController);
    
    function MainController($scope) {
        $scope.testline = 'It is main controller line!'
    }    
})();