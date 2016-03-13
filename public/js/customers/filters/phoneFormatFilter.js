(function() {
	'use strict';
	angular.module('customer').filter('phoneFormat', phoneFormat);
    
    function phoneFormat() {
        return function(phone) {
            if (!phone) { return ''; }
            
            var country = phone.slice(0, 3);
            var city = phone.slice(3, 5);
            var number = phone.slice(5);
            
            number = number.slice(0, 3) + '-' + number.slice(3, 5) + '-' + number.slice(5);

            return ('+' + country + '(' + city + ')' + number).trim();
        };
    }
})();