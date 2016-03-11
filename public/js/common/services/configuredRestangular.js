(function() {
	'use strict';
	angular.module('common')
		.factory('ConfiguredRestangular', ConfiguredRestangular);
		
		function ConfiguredRestangular(Restangular) {
            return Restangular.withConfig(function(RestangularConfigurer) {
                RestangularConfigurer.setRestangularFields({
                    id: '_id'
                });
            });
        }
})();